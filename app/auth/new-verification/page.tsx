import NewVerificationForm from "@/components/internal/Forms/NewVerificationForm";
import { Suspense } from "react";

const NewVerificationPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Suspense>
            <NewVerificationForm />
            </Suspense>
        </div>
    );
}

export default NewVerificationPage;