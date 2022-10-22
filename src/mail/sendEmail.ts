import nodemailer from "nodemailer";
import SendmailTransport from "nodemailer/lib/sendmail-transport";
require("dotenv").config();
const forMailUser = process.env.GMAIL_USER as string;
const forMailPass = process.env.GMAIL_PASS as string;
const fromUser = process.env.FROM as string;
const transport = nodemailer.createTransport({
  service: "gmail" as string,
  auth: {
    user: forMailUser as string,
    pass: forMailPass as string,
  },
  tls: {
    rejectUnauthorized: false as boolean,
  },
});
export const sendEmail = (
  from: string,
  to: string,
  subject: string,
  html: string
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    transport.sendMail(
      { from: fromUser as string, subject, to, html },
      (err: any, info: unknown) => {
        if (err) reject(err);
        resolve(info);
      }
    );
  });
};
