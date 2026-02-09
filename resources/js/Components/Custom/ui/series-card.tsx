import {ShowCard} from "@/components/ui/show-card.tsx";

function SeriesCard ({series}: {series: any}) {
  return (
    <div className={"flex flex-col items-start bg-warm-neutral p-4 gap-6"}>
        <p className={"text-2xl"}>{series.name}</p>
        <p className={"text-sm text-left max-w-[85ch]"}>{series.description}</p>
        <div className={"flex gap-6 items-center"}>
            <p className={"text-sm"}>{series.dates}</p>
            <p className={"text-sm"}>{series.prizeMoney}</p>
            <p className={"text-sm"}>{series.prizeMoney}</p>
            <p className={"text-sm"}>{series.availablePrizeList ? "Prize List Available" : "Prize List Not Yet Available"}</p>
        </div>
        <div className={"flex flex-wrap gap-6"}>
            <ShowCard show={{name:"Winter Spectacular I", date:"December 31, 2025 – January 4, 2026", class:"Premier Hunter/Level 6 Jumper"}} />
            <ShowCard show={{name:"Winter Spectacular II", date:"December 31, 2025 – January 4, 2026", class:"Premier Hunter/Level 6 Jumper"}} />
            <ShowCard show={{name:"Winter Spectacular III", date:"December 31, 2025 – January 4, 2026", class:"Premier Hunter/Level 6 Jumper"}} />
            <ShowCard show={{name:"Winter Spectacular IV", date:"December 31, 2025 – January 4, 2026", class:"Premier Hunter/Level 6 Jumper"}} />
            <ShowCard show={{name:"Winter Spectacular V", date:"December 31, 2025 – January 4, 2026", class:"Premier Hunter/Level 6 Jumper"}} />
        </div>
    </div>
  )
}

export {SeriesCard}