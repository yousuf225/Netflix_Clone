import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";



export default async function Home() {

  const user = auth();
 
if (!user) {
    return redirect('/login')
  }else{
    return redirect('/home')
  }
}
