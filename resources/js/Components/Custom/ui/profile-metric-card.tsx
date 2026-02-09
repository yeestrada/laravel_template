import {horseHead} from "@lucide/lab";
import {Icon, Calendar, Users, Trophy, type LucideIcon} from "lucide-react";
import type {LucideProps} from "lucide-react";
import React from "react";

const HorseHeadIcon = React.forwardRef<SVGSVGElement, Omit<LucideProps, "ref">>(
    (props, ref) => <Icon ref={ref} iconNode={horseHead} {...props} />
);

export const ProfileMetricIcon = {
    Calendar: "calendar",
    Trophy: "trophy",
    Users: "users",
    Horse: "horse",
};

export type ProfileMetricIcon = typeof ProfileMetricIcon[keyof typeof ProfileMetricIcon];

const iconMap: Record<ProfileMetricIcon, LucideIcon> = {
    [ProfileMetricIcon.Calendar]: Calendar,
    [ProfileMetricIcon.Trophy]: Trophy,
    [ProfileMetricIcon.Users]: Users,
    [ProfileMetricIcon.Horse]: HorseHeadIcon,
};


function ProfileMetricCard({
                               number,
                               label,
                               icon,
                               backgroundColor,
                               fillColor
                           }: {
    number: number;
    label: string;
    icon: ProfileMetricIcon;
    backgroundColor: string;
    fillColor: string;
}) {
    const Icon = iconMap[icon];
    return (
        <div
            className={
                "flex flex-col border border-horse-card-border p-6 rounded-lg bg-WEC-White shadow-sm gap-3"
            }
        >
            <div className={"flex justify-between"}>
                <div style={{backgroundColor}} className={`h-[48px] w-[48px] flex justify-center items-center p-3 rounded-lg`}>
                    <Icon style={{color:fillColor}} />
                </div>
                <div style={{backgroundColor}} className={"p-3 rounded-lg"}>+1</div>
            </div>
            <div className={"flex flex-col items-start"}>
                <p className="text-3xl">{number}</p>
                <p className="text-sm text-card-text-muted">{label}</p>
            </div>
        </div>
    );
}

export {ProfileMetricCard};
