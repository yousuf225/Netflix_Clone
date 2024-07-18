import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GithubSigninButton from "@/app/components/GithubButton";
import GoogleSigninButton from "@/app/components/GoogleButton";
import { redirect, useRouter } from "next/navigation"; // Changed to correct router import
import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";

export default async function login() {
   /*  const { isLoaded, signIn, setActive } = useSignIn();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<ClerkAPIError[]>(); // Changed to useState for consistency

    const router = useRouter();
   

    const handleSubmit = async (e: any) => {
        e.preventDefault(); // Corrected preventDefault to lowercase
        
        if (!isLoaded) {
            return;
        }
        
        try {
            const LoginDet = await signIn.create({
                identifier: email,
                password: password
            });

            if (LoginDet.status === 'complete') {
                await setActive({ session: LoginDet.createdSessionId });
                router.push('/home'); // Corrected to use router.push directly
            } else {
                console.log(JSON.stringify(LoginDet, null, 2));
            }
        } catch (err: any) {
            if (isClerkAPIResponseError(err)) {
                setErrors(err.errors);
            }
            console.log(JSON.stringify(err, null, 2));
        }
    } */
   const session = await getServerSession(authOptions)
   if (session) {
     return redirect('/home')
   }
    return (
        <div className="mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
            <form method="post" action="/api/auth/signin">
                <h1 className="text-3xl font-semibold text-white">Sign In</h1>
                <div className="space-y-4 mt-5">
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block"
                    />
                    {/* {errors && (
                        <ul>
                            {errors.map((el, idx) => (
                                <li key={idx} className="text-red-500">{el.longMessage}</li>
                            ))}
                        </ul>
                    )} */}
                    <Button type="submit" variant={"destructive"} className="w-full bg-[#e50914] hover:bg-red-500 text-white">Sign In</Button>
                </div>
            </form>

            <div className="text-gray-500 text-sm mt-4 text-center">
                First time on Netflix? <Link href="/signup" className="text-white ml-1 hover:underline">Sign Up</Link>
            </div>

            <div className="flex mt-6 gap-x-3 justify-center w-full">
                <GithubSigninButton />
                <GoogleSigninButton />
            </div>
        </div>
    );
}
