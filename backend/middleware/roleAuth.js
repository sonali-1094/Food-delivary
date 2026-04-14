import { clerkClient } from "@clerk/express";

const getSignedInEmail = async (userId) => {
  const user = await clerkClient.users.getUser(userId);
  const primaryEmailId = user?.primaryEmailAddressId;
  const primaryEmail = user?.emailAddresses?.find(
    (emailAddress) => emailAddress.id === primaryEmailId
  )?.emailAddress;

  return {
    user,
    email: primaryEmail?.toLowerCase() || ""
  };
};

const parseEmailList = (value = "") =>
  value
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export const requireShopkeeperOrAdmin = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { user, email } = await getSignedInEmail(userId);
    const allowedAdminEmails = parseEmailList(process.env.ADMIN_EMAILS);
    const allowedShopkeeperEmails = parseEmailList(process.env.SHOPKEEPER_EMAILS);
    const allowAllInDev =
      allowedAdminEmails.length === 0 && allowedShopkeeperEmails.length === 0;

    const isAdmin = allowedAdminEmails.includes(email);
    const isShopkeeper = allowedShopkeeperEmails.includes(email);

    if (!allowAllInDev && !isAdmin && !isShopkeeper) {
      return res.status(403).json({ message: "Shopkeeper access only" });
    }

    req.staffUser = user;
    req.staffRole = isAdmin ? "admin" : "shopkeeper";
    req.staffEmail = email;
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
