import MovieCard from "@/app/components/Moviecard";
import { authOptions } from "@/app/utils/auth";
import prisma from "@/app/utils/db"
import { getServerSession } from "next-auth";
import Image from "next/image";

async function getData(userId: string,) {
    const data = await prisma.watchList.findMany({
        where:{
            userId: userId,
        },
        select: {
            Movie:{
                select:{
                id: true,
                title: true,
                overview: true,
                WatchLists: true,
                imageString: true,
                youtubeString: true,
                age: true,
                release: true,
                duration: true,
                    }
            }
        }
    });
    return data;
}

export default async function Watchlist(){
    const session = await getServerSession(authOptions)
    const data = await getData(session?.user?.email as string)
    return (
        <>
        <h1 className=" text-4xl text-white font-bold underline mt-10 px-5 sm:px-0">Your WatchList</h1>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
            {data.map((movie) => (
                <div key={movie.Movie?.id} className=" relative h-60">
                    <Image 
                    src={movie.Movie?.imageString as string} 
                    alt="Movie" 
                    width={500} 
                    height={400}
                    className=" rounded-sm h-full w-full absolute object-cover"
                    />
                    <div className=" h-60 w-full relative z-10 transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                        <div className=" w-full h-full bg-gradient-to-b from-transparent via-black/50 to-black z-10 rounded-lg flex items-center justify-center">
                            <Image 
                            src={ movie.Movie?.imageString as string} 
                            alt="Movie" 
                            width={800} 
                            height={800}
                            className=" absolute w-full h-full -z-10 rounded-lg object-cover"
                            />

                            <MovieCard 
                            key={movie.Movie?.id} 
                            age={movie.Movie?.age as number}
                            movieId={movie.Movie?.id as number} 
                            overview={movie.Movie?.overview as string} 
                            title={movie.Movie?.title as string}
                            watchListId={movie.Movie?.WatchLists[0]?.id as string}
                            watchList={movie.Movie?.WatchLists.length as number > 0 ? true : false}  
                            time={movie.Movie?.duration as number}
                            year={movie.Movie?.release as number}
                            youtubeUrl={movie.Movie?.youtubeString as string}
                            />
                        </div>
                    </div>

                </div>
            ))}
        </div>
        </>
    );
}