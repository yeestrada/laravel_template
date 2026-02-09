function FormHeader({title, description}: {title: string, description: string}) {
    return (
        <div className={"flex flex-col items-start gap-1"}>
            <h6 className={"p-0 m-0"}>{title}</h6>
            <p className={"text-sm text-card-text-muted"}>{description}</p>
        </div>
    )
}

export { FormHeader };