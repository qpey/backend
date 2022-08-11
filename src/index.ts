import mongoose from "mongoose";
import { app } from "./app";
import { KEYS } from "./config/keys";

const start = async (): Promise<void> => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined!");
  }
  if (!process.env.REDIS_URI) {
    throw new Error("REDIS_URI must be defined!");
  }
  if (!process.env.COOKIE_SECRET) {
    throw new Error("COOKIE_SECRET must be defined");
  }
  if (!process.env.API_KEY) {
    throw new Error("API_KEY must be defined");
  }

  const uri = KEYS.MONGO_URI;
      
  mongoose.connect(uri).then(() => console.log("connected to  DB")).catch((error: any) => console.error(error));
};

process.on("uncaughtException", (err) => {
  console.log("Error: ", err);
  return err;
});
process.on("unhandledRejection", (err) => {
  console.log("Error: ", err);
});
process.on("uncaughtExceptionMonitor", (err) => {
  console.log("Error: ", err);
});

start();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
