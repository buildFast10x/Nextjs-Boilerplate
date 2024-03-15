import { EmailTemplate } from "@/app/component/email";
import { resend } from "@/resend/config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email } = body;
  try {
    const { data, error } = await resend.emails.send({
      from: "Buildfast <onboarding@resend.dev>",
      to: [email],
      subject: "Hello world!",
      react: EmailTemplate({ firstName: name }),
      text: "Email powered by Resend.",
    });
    if (error) {
      return NextResponse.json(error, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
