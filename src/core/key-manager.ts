import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { pbkdf2 } from "node:crypto";
import { encryptPlainText } from "./cipher";
import { decryptCipherText } from "./decipher";
import { QPEY_KEYS } from "../config/keys";

/**
 * @param password
 * Generates a key corresponding to the user's password for use in encrpytion and decryption
 * The key length is dependent on the algorithm.
 * In this case for aes-192-gcm, it is 24 bytes (192 bits).
 */
export const initialiseKeyDerivation = async (
  password: string
): Promise<string> => {
  const _pbkdf2 = promisify(pbkdf2);
  const salt = randomBytes(32).toString("hex");

  // First, we'll generate the key.
  const key = await _pbkdf2(password, salt, 100000, 192, "sha512");
  return key.toString("hex");
};

/**
 * @param key
 * Symmetrically Encrypts the user's key before being stored in the database
 */
export const encryptDerivedKey = (key: string): string => {
  return encryptPlainText(key, process.env.SECRET_KEY!);
};

/**
 * @param key
 * Symmetrically Decrypts the user's key to be used in the decryption of incoming QR code data
 */
export const decryptDerivedKey = (storedHash: string): string => {
  return decryptCipherText(storedHash, process.env.SECRET_KEY!);
};
