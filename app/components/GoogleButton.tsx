"use client"

import { Button } from "@/components/ui/button";
import GoogleIcon from "@/public/google.svg";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleSigninButton(){
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
            <Button onClick={() => signIn('google')} variant="outline" size="icon">
                <Image src={GoogleIcon} alt="Google icon" className="w-6 h-6"/>
            </Button>
            ) : (
                <p>Redirecting...</p>
            )}
        </div>
    )
}