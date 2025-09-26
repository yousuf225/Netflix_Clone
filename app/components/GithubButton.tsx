"use client"

import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GithubSigninButton(){
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
        router.push("/home");
        }
    }, [session, router]);
    return(
        <div>
        {!session ? (
        <Button onClick={()=>signIn('github')} variant="outline" size="icon">
        <GithubIcon></GithubIcon>
        </Button>
        ):(
            <p>Redirecting...</p>
        )}
        </div>
    )
}