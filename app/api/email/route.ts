import mailImpl from "@/data/mail/mailImpl";
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
      return NextResponse.json(error, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
