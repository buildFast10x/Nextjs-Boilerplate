import { NextResponse } from "next/server";


export async function GET( req: Request) {

    return NextResponse.json({message: "xyz"});
}


export async function POST(req: Request) {
    const data = req.json();

    return NextResponse.json({ message: "xyz" });
}
