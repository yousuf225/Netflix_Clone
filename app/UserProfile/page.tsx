"use client"

import { useUser } from "@clerk/nextjs"

export default function UserProfile(){
    const {user} = useUser();

    
    return(
        <>
        <p className=" text-sm font-medium leading-none">{user?.fullName}</p>
        <p className=" text-xs leading-none text-muted-foreground">{user?.emailAddresses[0].emailAddress}</p>
        </>
    )
}