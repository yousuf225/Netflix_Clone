"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GithubSigninButton from "@/app/components/GithubButton";
import GoogleSigninButton from "@/app/components/GoogleButton";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { useState } from "react";

export default function signUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
         /* const session = await getServerSession(authOptions)
         if (session) {
           return redirect('/home')
         } */
     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
    
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Signup failed");
                return;
            }

            // redirect to login after signup
            router.push("/login");
            } catch (err) {
            console.log("Catch Error")
            setError("Something went wrong");
            }
        };


    return (
        <div className=" mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
                <><form onSubmit={handleSubmit}>
                    <h1 className=" text-3xl font-semibold text-white">Sign Up</h1>
                    {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
                    <div className=" space-y-4 mt-5">
                        <Input
                            type="email"
                            name={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className=" bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block" />
                        <Input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className=" bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block" />
                        
                        <Button type="submit" className="w-full bg-[#e50914] hover:bg-red-500 text-white">Sign Up</Button>
                    </div>
                </form>
                <div className=" text-gray-500 text-sm mt-4 text-center">
                Already have an account? <Link href="/login" className=" text-white ml-1 hover:underline">Login</Link>
                </div>
                <div className=" flex mt-6 gap-x-3 justify-center w-full">
                        <GithubSigninButton />
                        <GoogleSigninButton />
                </div></>
        </div>
    );
}