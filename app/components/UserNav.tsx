"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UserProfile from "@/UserProfile/page";
import { signOut } from "next-auth/react";


export default async function UserNav(){
    
    return(
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className=" relative h-10 w-10 rounded-sm">
                    <Avatar className="h-10 w-10 rounded-sm">
        <AvatarImage src="https://dtizryknjwfpgsxnenqs.supabase.co/storage/v1/object/public/user%20%20image/avatar.png"/>
        <AvatarFallback className=" rounded-sm">RY</AvatarFallback>
        </Avatar>                   
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="flex flex-col space-y-1">
                    <UserProfile/>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                        Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu></>

    )
}