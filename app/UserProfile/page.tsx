"use client"

import { useSession, useUser } from "@clerk/nextjs"

export default function UserProfile(){
    const {session} = useSession();

    
    return(
        <>
        <p className=" text-sm font-medium leading-none">{session?.user.fullName}</p>
        <p className=" text-xs leading-none text-muted-foreground">{session?.user.emailAddresses[0].emailAddress}</p>
        </>
    )
}