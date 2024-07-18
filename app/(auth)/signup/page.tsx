import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GithubSigninButton from "@/app/components/GithubButton";
import GoogleSigninButton from "@/app/components/GoogleButton";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

export default async function signUp() {
    /*  const { isLoaded, signUp, setActive } = useSignUp();
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
     } */
         const session = await getServerSession(authOptions)
         if (session) {
           return redirect('/home')
         }

    return (
        <div className=" mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
                <><form method="post" action="/api/auth/signin">
                    <h1 className=" text-3xl font-semibold text-white">Sign Up</h1>
                    <div className=" space-y-4 mt-5">
                        {/* <Input
                            type="text"
                            name="first_name"
                            placeholder="Full Name"
                            className=" bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block" /> */}
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
                      {/*   {errors && (
                            <ul>
                                {errors.map((el, idx) => <li key={idx} className="text-red-500">{el.longMessage}</li>
                                )}
                            </ul>
                        )} */}
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