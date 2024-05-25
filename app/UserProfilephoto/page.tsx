"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react"

export default function UserProfilephoto(){
      const {data : session} = useSession();
    return(
        <Avatar className="h-10 w-10 rounded-sm">
        <AvatarImage src={session?.user?.image as string}/>
        <AvatarFallback className=" rounded-sm"><img src="https://dtizryknjwfpgsxnenqs.supabase.co/storage/v1/object/public/user%20%20image/avatar.png" alt="RY" /></AvatarFallback>
    </Avatar>   
    )
}