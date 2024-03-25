import { Suspense } from "react";
import Search from "../component/search";

type Props = {}

export default function page({ }: Props) {
    return (
        <Suspense>
        <Search />
        </Suspense>
    ) 
}