import { client } from "./notification";

export const sendVerificationMessage = (): any => {
  client.verify.v2
    .services("VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .verificationChecks.create({ to: "+256787444814", code: "123456" })
    .then((verification_check: { status: any }) => {
      console.log(verification_check.status);
      return verification_check.status;
    });
};
