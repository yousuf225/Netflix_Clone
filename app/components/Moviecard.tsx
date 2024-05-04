"use client"

import { Button } from "@/components/ui/button";
import { Heart, PlayCircle } from "lucide-react";
import PlayVideoModal from "./PlayVideoModal";
import { useState } from "react";
import addToWatchList, { DeleteWatchList } from "../acton";
import { usePathname } from "next/navigation";

interface iAppProps{
    title: string;
    overview: string;
    movieId: number;
    watchList: boolean;
    watchListId: string;
    youtubeUrl: string;
    year : number;
    age: number;
    time: number;
}

export default function MovieCard({
    title,
    movieId,
    overview,
    watchList,
    watchListId,
    youtubeUrl,
    year,
    age,
    time,
}:iAppProps){
    const[open, setOpen] = useState(false)
    const pathName = usePathname()   

   return(
        <>
        <button onClick={() => setOpen(true)} className=" -mt-14">
            <PlayCircle className="h-20 w-20"/>
        </button>
            <div className=" right-5 top-5 absolute z-10">
                {watchList ? ( <form action={DeleteWatchList}>
                    <input type="hidden" name="WatchListId" value={watchListId} />
                    <input type="hidden" name="pathname" value={pathName} />
                    <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4 text-red-500"/>
                    </Button>
                </form>
                ) : ( <form action={addToWatchList}>
                    <input type="hidden" name="movieId" value={movieId} />
                    <input type="hidden" name="pathname" value={pathName} />
                    <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4"/>
                    </Button>
                </form>
                    )
                    }
            </div>
            <div className="p-5 absolute bottom-0 left-0">
                    <h1 className=" font-bold text-lg line-clamp-1">{title}</h1>
                    <div className="flex gap-x-2 items-center">
                        <p className=" text-sm font-normal">{year}</p>
                        <p className=" text-sm font-normal border border-gray-200 px-1 py-0.5 rounded">{age}+</p>
                        <p className=" text-sm font-normal">{time}h</p>
                    </div>
                    <p className=" text-sm line-clamp-1 text-gray-200">{overview}</p>
            </div>

            <PlayVideoModal 
            title={title} 
            youtubeUrl={youtubeUrl} 
            key={movieId} 
            overview={overview} 
            state={open} 
            changeState={setOpen}
            age={age}
            duration={time}
            release={year}
            />
        </>
    );
}