import ResetForm from "@/components/internal/Forms/ResetForm";
import { Suspense } from "react";

export default async function ResetPage() {

    return (
        <div className="flex items-center justify-center h-screen">
            {/* <Link href={'/api/auth/signin'} className={cn(buttonVariants({ size: "lg" }))}>Login</Link> */}
            <Suspense>
            <ResetForm />
            </Suspense>
        </div>
    );
}
