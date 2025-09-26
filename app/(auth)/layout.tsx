import Image from "next/image";
import { ReactNode } from "react";
import Backgroundimage from "@/public/login_background.jpg"
import Logo from "@/public/netflix_logo.svg"


export default function AuthLayout({children}: {children:ReactNode}){
   return(
    <div className="relative flex flex-col bg-black h-screen w-screen md:items-center md:justify-center md:bg-transparent">

        <Image 
        src={Backgroundimage} 
        alt="baground image" 
        className="hidden sm:flex sm:object-cover -z-10 brightness-50"
        priority
        fill
        />
        <Image src={Logo} 
        alt="Logo" 
        width={150}
        height={150}
        className=" absolute left-4 top-4 object-contain md:left-10 md:top-6"
        priority
        />

        {children}
    </div>
   ) 
}