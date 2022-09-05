import { promisify } from "util";
import { pbkdf2, randomBytes } from "node:crypto";

/**
 * @param password
 * generates a key corresponding to the user's password for use in encrpytion and decryption
 */
export const initializeKeyDerivation = async (
  password: string
): Promise<string> => {
  const _pbkdf2 = promisify(pbkdf2);
  const salt = randomBytes(32).toString("hex");

  const key = await _pbkdf2(password, salt, 100000, 128, "sha512");
  return key.toString("hex");
};
