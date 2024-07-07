'use client'

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/netflix_logo.svg"
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import UserNav from "./UserNav";
import SideBar from "./sidebar";
import { UserButton } from "@clerk/clerk-react";

interface linksProps{
    name: string;
    href: string
}


const links: linksProps[ ] = [
    {name: 'Home', href: "/home" },
    {name: "Tv Shows", href: "/home/shows"},
    {name: "Movies", href: "/home/movies"},
    {name: "Recently Added", href: "/home/recently"},
    {name: "My List", href: "/home/user/list"},
];

export default function Navbar() {
    const pathName = usePathname()
    return(
        <div className="w-full max-w-7xl mx-auto justify-between items-center px-5 sm:px-6 py-5 lg:px-8 flex">
                <div className="flex items-center">
                    <SideBar/>
                    <Link href="/home" className=" w-40">
                        <Image src={Logo} alt="Netflix logo" priority />
                    </Link>
                    <ul className=" lg:flex gap-x-6 ml-14 hidden">
                        {links.map((link, idx) => (
                            <div key={idx}>
                                {pathName === link.href ? (
                                    <li><Link href={link.href} className=" text-white font-semibold text-lg underline">
                                        {link.name}
                                    </Link></li>
                                ) : (
                                    <li><Link href={link.href} className=" text-gray-300 text-lg font-normal">
                                        {link.name}
                                    </Link>
                                    </li>

                                )}
                            </div>
                        ))}
                    </ul>
                </div>

                <div className="flex text-gray-300 items-center gap-x-4 lg:gap-8 md:gap-7">
                    <Search className="w-5 h-5 text-gray-300 cursor-pointer" />
                    <Bell className="w-5 h-5 text-gray-300 cursor-pointer" />
                    
                    <UserNav />
                </div>
            </div>
    );
}