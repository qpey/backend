import twilio from "twilio";
import { QPEY_KEYS } from "../config/keys";
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = QPEY_KEYS;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export { client };
