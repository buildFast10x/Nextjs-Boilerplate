import ResetForm from "@/components/internal/Forms/ResetForm";

export default async function ResetPage() {

    return (
        <div className="flex items-center justify-center h-screen">
            {/* <Link href={'/api/auth/signin'} className={cn(buttonVariants({ size: "lg" }))}>Login</Link> */}
            <ResetForm />
        </div>
    );
}
