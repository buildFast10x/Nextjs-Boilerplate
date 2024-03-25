import LoginForm from "@/components/internal/Forms/LoginForm";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/next-auth/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getCurrentUser();

  if (session) {
    redirect('/dashboard')
  }


  return (
    <div className="flex items-center justify-center h-screen">
      {/* <Link href={'/api/auth/signin'} className={cn(buttonVariants({ size: "lg" }))}>Login</Link> */}
      <LoginForm />
    </div>
  );
}
