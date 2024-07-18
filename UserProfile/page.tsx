import { useSession } from "next-auth/react";


const UserProfile = () => {
    const { data : session} = useSession()
    return ( 
        <>
        <div className="text-sm leading-none font-medium">{session?.user?.name}</div>
        <div className="text-xs leading-none text-muted-foreground">{session?.user?.email}</div>
        </>
     );
}
 
export default UserProfile;