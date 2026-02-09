import { Button } from "@/components/ui/button.tsx";

function ShowDisplayCard({ show, dateFormatter }: { show: any, dateFormatter: (date: any) => string }) {
    return (
        <div className={"flex shadow-sm rounded-lg justify-between bg-feature-card"}>
            <div className={"flex flex-col items-start gap-6 p-4"}>
                <p className={"text-2xl"}>{show.name}</p>
                <div className={"flex flex-col gap-6 items-center"}>
                    <div className="flex justify-between gap-2">
                        <span className={"text-sm"}>{`${dateFormatter(show.startDate)} - ${dateFormatter(show.endDate)}`}</span>
                    </div>
                    <p className={"text-sm"}>{show.prizeMoney}</p>
                    <p className={"text-sm"}>{show.availablePrizeList ? "Prize List Available" : "Prize List Not Yet Available"}</p>
                </div>
                <Button className={"text-sm text-WEC-Purple mt-5 border-[0.5px] bg-transparent"}
                    variant={"outline"}>Book Now</Button>
            </div>
            <img className={"place-self-end rounded-e-lg"} src="https://placecats.com/300/200?fit=cover" alt="" />
        </div>
    )
}

export { ShowDisplayCard };
