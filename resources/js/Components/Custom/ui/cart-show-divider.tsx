function CartShowDivider({show}: {show: string}) {
    return (
        <div className={"flex flex-col gap-1 w-fit"}>
            <p className={"text-2xl text-left"}>{show}</p>
            <hr className={"w-full"}/>
        </div>
    )
}

export {CartShowDivider}