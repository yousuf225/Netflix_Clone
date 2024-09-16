import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GithubSigninButton from "@/app/components/GithubButton";
import GoogleSigninButton from "@/app/components/GoogleButton";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

export default async function signUp() {
         const session = await getServerSession(authOptions)
         if (session) {
           return redirect('/home')
         }

    return (
        <div className=" mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
                <><form method="post" action="/api/auth/signin">
                    <h1 className=" text-3xl font-semibold text-white">Sign Up</h1>
                    <div className=" space-y-4 mt-5">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className=" bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block" />
                        <Input
                            type="password"
                            name="Password"
                            placeholder="Password"
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