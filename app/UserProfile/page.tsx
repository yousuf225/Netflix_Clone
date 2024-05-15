"use client"
import { useSession } from "next-auth/react"

export default function UserProfile(){
    const {data : session} = useSession();
    
    return(
        <>
        <p className=" text-sm font-medium leading-none">{session?.user?.name}</p>
        <p className=" text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
        </>
    )
}