"use client"

import { Button } from "@/components/ui/button"
import { InfoIcon, PlayCircle } from "lucide-react"
import { useState } from "react"
import PlayVideoModal from "./PlayVideoModal"

interface iAppProps {
    title: string;
    overview: string;
    duration: number;
    releaseDate: number;
    age: number;
    id: number;
    youtubeUrl: string;
}

export default function MovieButtons({age,duration,id,overview,releaseDate,title,youtubeUrl}:iAppProps){
    const [open,setOpen] = useState(false)
    return (
        <>
        <Button onClick={() => setOpen(true)} className="font-medium text-lg">
                <PlayCircle className=" mr-2 w-6 h-6"/> Play
        </Button>
        <Button onClick={() => setOpen(true)} className="font-medium text-lg bg-white/40 hover:bg-white/30 text-white">
            <InfoIcon className="mr-2 w-6 h-6"/>Learn more
        </Button>
        <PlayVideoModal state={open} changeState={setOpen} title={title} overview={overview} age={age} duration={duration} youtubeUrl={youtubeUrl} key={id} release={releaseDate}/>

        </>
    )
}