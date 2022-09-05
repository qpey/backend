import { randomInt } from "crypto";

import util from "util";

export const generateSecureRandomNumber = async () => {
  const randomIntAsync = util.promisify(randomInt);
  try {
    const number = (await randomIntAsync(999999)) as number;
    return number;
  } catch (error) {
    console.error("Error: ", error);
  }
};
