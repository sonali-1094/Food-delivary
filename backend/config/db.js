import mongoose from "mongoose";
import dns from "node:dns";

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  const connectOptions = { serverSelectionTimeoutMS: 10000 };

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing in backend/.env");
  }

  try {
    await mongoose.connect(mongoUri, connectOptions);
    console.log("DB Connected");
  } catch (error) {
    const isSrvLookupError =
      mongoUri.startsWith("mongodb+srv://") &&
      String(error.message).includes("querySrv ECONNREFUSED");

    if (isSrvLookupError) {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);

      try {
        await mongoose.connect(mongoUri, connectOptions);
        console.log("DB Connected");
        return;
      } catch (retryError) {
        throw new Error(
          "MongoDB SRV lookup failed after DNS retry. Use the Atlas non-SRV mongodb:// URI in MONGO_URI or check your network DNS."
        );
      }
    }

    throw new Error(`DB Error: ${error.message}`);
  }
};
