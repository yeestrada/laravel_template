import {Button} from "@/components/ui/button.tsx";

function ShowCard({show}: {show: any}) {
    return (
        <div className={"flex flex-col items-start shadow-sm rounded-lg gap-2 p-4 w-fit min-w-[380px] bg-transparent border border-horse-card-border"}>
            <p className={"text-xl"}>{show.name}</p>
            <p className={"text-sm text-card-text-muted"}>{show.date}</p>
            <p className={"text-sm"}>{show.class}</p>
            <Button className={"place-self-end text-sm text-WEC-Purple mt-5 border-[0.5px] bg-transparent"} variant={"outline"}>Book Now</Button>
        </div>
    )
}

export { ShowCard };