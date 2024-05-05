"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default async function UserNav(){
    return(
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
                    <p className=" text-sm font-medium leading-none">RY</p>
                    <p className=" text-xs leading-none text-muted-foreground">syiyuyh@gmail.com </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>signOut()} className=" cursor-pointer">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}