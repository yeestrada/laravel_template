function FeatureCard({title, description}: Readonly<{ title: string; description: string; }>) {
    return (
        <div className="flex flex-col justify-start p-6 bg-feature-card rounded-sm shadow-md shadow-WEC-Purple/30 gap-2" >
            <p className={"font-bold text-WEC-Purple"} >{title}</p >
            <p >{description}</p >
        </div >
    );
}

export { FeatureCard };