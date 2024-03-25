"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'


type Props = {
    user: User
}

export default function UserMenu({ user }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="border-red-600 border-2">
                    <AvatarImage src={user.image ? user.image : ""} />
                    <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="flex gap-2 items-center justify-start text-red-500" onClick={async () => await signOut()}>
                    <LogOut size={18} /> Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}