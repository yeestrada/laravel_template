function PageHeader({title, description, className} : {title: string, description?: string, className?: string}) {
    return (
        <div className={`flex flex-col text-left w-fit mb-4 ${className}`}>
            <h3 className={"mb-2 font-light"}>{title}</h3>
            <p className={"mb-1 text-card-text-muted"}>{description}</p>
            <hr className="w-full bg-[#E4E4E7]" />
        </div>
    )
}

export { PageHeader };