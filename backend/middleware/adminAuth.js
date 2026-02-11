import { clerkClient } from "@clerk/express";

export const requireAdmin = async (req, res, next) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);
    const primaryEmailId = user?.primaryEmailAddressId;
    const primaryEmail = user?.emailAddresses?.find(
      (emailAddress) => emailAddress.id === primaryEmailId
    )?.emailAddress;

    const allowedAdminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    // If ADMIN_EMAILS is not configured, allow all signed-in users in dev.
    if (
      allowedAdminEmails.length > 0 &&
      (!primaryEmail || !allowedAdminEmails.includes(primaryEmail.toLowerCase()))
    ) {
      return res.status(403).json({ message: "Admin access only" });
    }

    req.adminUser = user;
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
