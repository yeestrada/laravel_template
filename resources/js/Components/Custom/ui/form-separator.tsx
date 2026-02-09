function FormSeparator({title}: {title: string}) {
    return (
        <div className="flex flex-col items-start">
            <p className={"text-lg text-WEC-Purple"}>{title}</p>
            <hr className={"w-full bg-WEC-Purple text-WEC-Purple h-[2px]"} />
        </div>
    )
}

export {FormSeparator};