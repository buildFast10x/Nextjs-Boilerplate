import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        if (!data.email || !data.password || !data.name) {
            return NextResponse.json({ message: 'User details are missing' }, { status: 400 })
        }

        const userExists = await prisma?.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (userExists) {
            return NextResponse.json({ message: 'User already Exists' }, { status: 200 })
        }

        const hashedPassword = await hash(data.password, 10);
        const createUser = await prisma?.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
            }
        })
        if (createUser) {
            const { password, emailVerified, ...rest } = createUser;
            return NextResponse.json({ message: 'User created successfully', user: rest }, { status: 200 })
        }

    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}