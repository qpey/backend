import { createCipheriv } from "node:crypto";

const ALGORITHM = "aes-192-gcm";

export const encryptPlainText = (
  plainTextdata: string,
  encryptionkey: string
): string => {
  let cipherText: string = "";
  try {
    //We'll generate a random initialization vector
    const initialisationVector = Buffer.alloc(16, 0);

    // Once we have the key and initialization vector(), we can create and use the cipher...
    const cipher = createCipheriv(
      ALGORITHM,
      encryptionkey,
      initialisationVector
    );

    cipherText = cipher.update(plainTextdata, "utf-8", "hex");
    cipherText += cipher.final("hex");
  } catch (error) {
    console.error("Error: #%d ", error);
  }

  console.log("Cipher Text: ", cipherText);
  return cipherText;
};
