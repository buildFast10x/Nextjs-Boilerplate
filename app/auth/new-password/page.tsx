import NewPasswordForm from "@/components/internal/Forms/NewPasswordForm";
import { Suspense } from "react";

const NewPasswordPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Suspense>
            <NewPasswordForm />
            </Suspense>
        </div>
    );
}

export default NewPasswordPage;