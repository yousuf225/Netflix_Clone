
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger, } from "@/components/ui/sheet";
import { Menu, SidebarClose} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function SideBar(){


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
    const pathName = usePathname()

    return(
        <aside>
            <Sheet>
                <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className=" text-sm z-10 size-min mr-4 lg:hidden">
                 <Menu size={20} />   
                </Button>
                </SheetTrigger>
                <SheetContent side={"left"} className=" text-red-600 text-2xl font-bold px-3 py-4">
                <h1>NETFLIX</h1>
                
                    <ul className=" flex flex-col gap-y-6 mt-10">
                        {links.map((link, idx) => (
                            <div key={idx}>
                                {pathName === link.href ? ( 
                                  <li><SheetClose asChild>
                                    <Link href= {link.href} type='submit' className=" text-white font-semibold text-lg">
                                     {link.name}
                                    </Link>
                                    </SheetClose>
                                    </li>
                                   ) : (
                                    <li><Link href={link.href} className=" text-gray-300 text-lg font-normal">
                                        {link.name}
                                    </Link>
                                    </li> 
                                )}
                            </div>
                           
                        ))}
                    </ul>  
                    
                </SheetContent>
            </Sheet>
        </aside>
    )
}