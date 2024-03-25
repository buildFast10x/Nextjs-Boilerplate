"use client"

import { AlertCircle, CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation"

type Props = {}

export default function Search({ }: Props) {
    const query = useSearchParams();
    if (query.get('success')) {
        return (<div className="flex items-center flex-col text-green-500 p-20 gap-6">
            <CheckCircle size={44} />
            <p className="text-2xl">Payment Success</p>
        </div>)
    }
    return (

        <div className="flex items-center flex-col text-red-500 p-20 gap-6">
            <AlertCircle size={44} />
            <p className="text-2xl">Payment Failed</p>
        </div>
    )
}