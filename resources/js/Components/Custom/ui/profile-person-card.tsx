import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

function ProfilePersonCard({ person }: { person: any }) {
  return (
    <div className="border border-horse-card-border rounded-lg p-6 shadow-sm flex flex-wrap gap-4">
      <div className="p-3 bg-gradient-to-br from-[#F3E8FF] to-[#DBEAFE] rounded-full h-[48px] w-[48px]">
        <User className={"text-[#9810FA]"} />
      </div>
      <div className="flex flex-col items-start">
        <div className="flex justify-between ">
          <p className="text-lg">{person?.firstName} {person?.lastName}</p>
          {/* <Badge label={person.isVerified ? "Verified" : "Unverified"} /> */}
        </div>
        <p className="text-sm">{person?.phoneNumbers[0].number}</p>
        <p className="text-sm text-blue-900">{person?.email}</p>
      </div>
    </div>
  );
}

export { ProfilePersonCard };
