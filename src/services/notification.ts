import twilio from "twilio";
import { QPEY_KEYS } from "../config/keys";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = QPEY_KEYS;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const sendSMS = async (
  msg: string,
  toNo: string
): Promise<MessageInstance | undefined> => {
  try {
    const message = await client.messages.create({
      body: msg,
      from: QPEY_KEYS.TWILIO_PHONE_NO,
      to: toNo,
    });
    return message;
  } catch (error) {
    console.error("error #%d", error);
  }
};

export { client };
