import mailImpl from "@/data/mail/mailImpl";
import resendInstance from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const mail = new mailImpl();
  mail.initFromDataObject(body);
  mail.setFrom("Buildfast <onboarding@resend.dev>");
  mail.setSubject("Hello world");
  mail.setText("Mail by buildfst");

  const { name, email } = body;
  try {
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
