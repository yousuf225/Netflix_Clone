import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // If not logged in, go to login page
    return redirect("/login");
  }

  // If logged in, go to home/dashboard
  return redirect("/home"); 
}