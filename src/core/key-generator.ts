import { promisify } from "util";
import { pbkdf2, randomBytes } from "node:crypto";

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
  const key = await _pbkdf2(password, salt, 10000, 192, "sha512");
  return key.toString("hex");
};
