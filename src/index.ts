import { app } from "./app";
import { QPEY_KEYS, MOMO_KEYS } from "./config/keys";
import { MongoClient } from "mongodb";

const { COLLECTIONS, COLLECTION_WIDGET, REMITANCES } = MOMO_KEYS;
const { API_KEY, JWT_KEY, MONGO_URI, REDIS_URI, COOKIE_SECRET } = QPEY_KEYS;

const start = async (): Promise<void> => {
  if (!COLLECTIONS?.PRIMARY_KEY || !COLLECTIONS?.SECONDARY_KEY) {
    throw new Error(
      "COLLECTIONS PRIMARY_KEY and SECONDARY_KEY Must be defined"
    );
  }
  if (!COLLECTION_WIDGET?.PRIMARY_KEY || !COLLECTION_WIDGET?.SECONDARY_KEY) {
    throw new Error(
      "COLLECTION_WIDGET PRIMARY_KEY and SECONDARY_KEY Must be defined"
    );
  }
  if (!REMITANCES?.PRIMARY_KEY || !REMITANCES?.SECONDARY_KEY) {
    throw new Error("REMITANCES PRIMARY_KEY and SECONDARY_KEY Must be defined");
  }
  if (!JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }
  if (!MONGO_URI) {
    throw new Error("MONGO_URI must be defined!");
  }
  if (!REDIS_URI) {
    throw new Error("REDIS_URI must be defined!");
  }
  if (!COOKIE_SECRET) {
    throw new Error("COOKIE_SECRET must be defined");
  }
  if (!API_KEY) {
    throw new Error("API_KEY must be defined");
  }
  const client = new MongoClient(MONGO_URI);
  try {
    client.connect(async (err: any) => {
      if (err) {
        console.error(err);
      }
      await client.db("admin").command({ ping: 1 });
      console.log("Conneted TO DB");
    });
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
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
