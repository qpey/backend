import { Buffer } from "node:buffer";
import { scryptSync, createDecipheriv, createCipheriv } from "node:crypto";

const ALGORITHM = "aes-192-gcm";

export const generateCipherText = (
  cipherText: string,
  decryptionKey: string
): string => {
  // The IV is usually passed along with the ciphertext.
  const initialisationVector = Buffer.alloc(16, 0); // Initialization vector.

  const decipher = createDecipheriv(
    ALGORITHM,
    decryptionKey,
    initialisationVector
  );

  // Encrypted using same algorithm, key and initialisationVector.
  let decrypted = decipher.update(cipherText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  console.log(decrypted);
  // Prints: some clear text data

  return decrypted;
};
