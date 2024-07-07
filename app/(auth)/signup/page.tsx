"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GithubSigninButton from "@/app/components/GithubButton";
import GoogleSigninButton from "@/app/components/GoogleButton";
import { useState } from "react";
import { useSession, useSignUp } from "@clerk/nextjs";
import {ClerkAPIError} from "@clerk/types"
import { redirect, useRouter } from "next/navigation";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";

export default function signUp(){
    
    const { isLoaded, signUp, setActive } = useSignUp();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pendingverification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');
    const [errors, setErrors] = useState<ClerkAPIError[]>();
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        if (!isLoaded) {
            return;
        }
           try {
                await signUp.create({
                firstName : fullname,
                emailAddress: email,
                password: password
                })
        }
        catch (err) {
            if (isClerkAPIResponseError(err)) {
                setErrors(err.errors)
            }
        }

        await signUp.prepareEmailAddressVerification({strategy:'email_code'})
        setPendingVerification(true);
    }

    const OnPressVerify = async (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        if (!isLoaded) {
            return;
        }
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })
            if (signUpAttempt.status === 'complete') {
                await setActive({session : signUpAttempt.createdSessionId})
                router.push('/home')
            }
        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
        }
    }
    
    return(
        <div className=" mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
        {!pendingverification &&(
        <><form onSubmit={handleSubmit}>
                    <h1 className=" text-3xl font-semibold text-white">Sign Up</h1>
                    <div className=" space-y-4 mt-5">
                        <Input
                            type="text"
                            name="first_name"
                            placeholder="Full Name"
                            onChange={(e) => setFullname(e.target.value)}
                            className=" bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block" />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className=" bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block" />
                        <Input
                            type="password"
                            name="Password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className=" bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block" />
                        {errors && (
                            <ul>
                                {errors.map((el, idx) => <li key={idx} className="text-red-500">{el.longMessage}</li>
                                )}
                            </ul>
                        )}
                        <Button type="submit" className="w-full bg-[#e50914] hover:bg-red-500 text-white">Sign Up</Button>
                    </div>
                </form><div className=" text-gray-500 text-sm mt-4 text-center">
                        Already have an account? <Link href="/login" className=" text-white ml-1 hover:underline">Login</Link>
                    </div><div className=" flex mt-6 gap-x-3 justify-center w-full">

                        <GithubSigninButton />
                        <GoogleSigninButton />

                    </div></>
        )}
        {pendingverification && (
            <div>
            <form className='text-center grid mb-6 space-y-4 md:space-y-6 mt-[10i0px]'>
            <div className="mb-0 font-bold text-xl text-white">Register</div>
            <p className="font-normal text-sm text-white">Enter code sent to your email</p>
              <input
                value={code}
                className='bg-gray-50 border border-gray-300 text-gray-600 sm:text-sm rounded-lg block w-full p-2.5'
                placeholder='Enter Verification Code...'
                onChange={(e)=>setCode(e.target.value)}
              />
              <button
                type='submit'
                onClick={OnPressVerify}
                className='w-full text-white bg-red-600 hover:bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Verify Email
              </button>
            </form>
          </div>
        )}
       </div>
    )
}