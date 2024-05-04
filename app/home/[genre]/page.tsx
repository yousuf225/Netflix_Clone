import MovieCard from "@/app/components/Moviecard";
import { authOptions } from "@/app/utils/auth";
import prisma from "@/app/utils/db"
import { getServerSession } from "next-auth";
import Image from "next/image";

async function getData(category:string,userId:string) {
    switch(category){
        case "shows":{
            const data = await prisma.movie.findMany({
                where: {
                    category: 'show'
                },
                select: {
                    id: true,
                    title: true,
                    overview: true,
                    imageString: true,
                    age: true,
                    duration: true,
                    release: true,
                    youtubeString: true,
                    WatchLists:{
                        where: {userId: userId,}
                    }
                }
            });
            return data;
        }
        case "movies":{
            const data = await prisma.movie.findMany({
                where:{
                    category: 'movie'
                ,},
                select:{
                    id: true,
                    title: true,
                    overview: true,
                    imageString: true,
                    age: true,
                    duration: true,
                    release: true,
                    youtubeString: true,
                    WatchLists:{
                        where: {userId: userId,}
                    }
                }
            });
            return data;
        }
        case "recently":{
            const data = await prisma.movie.findMany({
                where:{
                    category: 'recent',
                },
                select: {
                    id: true,
                    title: true,
                    overview: true,
                    imageString: true,
                    age: true,
                    release: true,
                    duration: true,
                    youtubeString: true,
                    WatchLists:{
                        where:{ userId: userId, }
                    }
                }
            });
            return data;
        }

        default:{
            throw new Error();
        }
    }
}

export default async function Catagorypage({params}:{params:{genre:string}}){
    const session = await getServerSession(authOptions)
    const data = await getData(params.genre, session?.user?.email as string);
    return (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
            {data.map((movie) => (
                <div key={movie.id} className=" relative h-60">
                    <Image 
                    src={movie.imageString} 
                    alt="Movie" 
                    width={500} 
                    height={400}
                    className=" rounded-sm h-full w-full absolute object-cover"
                    />
                    <div className=" h-60 w-full relative z-10 transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                        <div className=" w-full h-full bg-gradient-to-b from-transparent via-black/50 to-black z-10 rounded-lg flex items-center justify-center">
                            <Image 
                            src={ movie.imageString} 
                            alt="Movie" 
                            width={800} 
                            height={800}
                            className=" absolute w-full h-full -z-10 rounded-lg object-cover"
                            />

                            <MovieCard 
                            key={movie.id} 
                            age={movie.age}
                            movieId={movie.id} 
                            overview={movie.overview} 
                            title={movie.title}
                            watchListId={movie.WatchLists[0]?.id}
                            watchList={movie.WatchLists.length > 0 ? true : false}  
                            time={movie.duration}
                            year={movie.release}
                            youtubeUrl={movie.youtubeString}
                            />
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}