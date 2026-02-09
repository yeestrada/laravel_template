function ModalSectionDivider({sectionTitle, className}: {sectionTitle: string, className?: string}) {
    return (
        <p className={`text-WEC-Purple text-lg underline underline-offset-8 decoration-2 ${className}`}>{sectionTitle}</p>
    )
}

export {ModalSectionDivider}
