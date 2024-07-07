import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { useSession } from "@clerk/clerk-react";



export default async function Home() {

  const {session} = useSession();
 
if (!session) {
    return redirect('/login')
  }else{
    return redirect('/home')
  }
}
