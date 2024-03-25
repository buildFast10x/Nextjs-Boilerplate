import mailImpl from "@/data/mail/mailImpl";
import errorHandler from "@/helpers/errorHandler";
import resendInstance from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const mail = new mailImpl();
  mail.initFromDataObject(body);
  mail.setFrom("Harsh Arya <harsharya7021@gmail.com>");
  mail.setSubject("Hello world");
  mail.setText("Mail by buildfst");

  const { name, email } = body;

  try {
    mail.setEmail(email);
    const resend = new resendInstance;
    const { data, error } = await resend.sendMail(mail)
    if (error) {
      const errorHandlerInstance = new errorHandler();
      errorHandlerInstance.internalServerError(error);
      return errorHandlerInstance.generateError();
    }
    return NextResponse.json(data);
  } catch (e: any) {
    const error = new errorHandler();
    error.internalServerError(e);
    return error.generateError();
  }
}
