import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
function ProfileSectionDivider({
  label,
  buttonLabel,
    callback
}: {
  label: string;
  buttonLabel: string;
  callback?: () => void;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <span className="w-[4px] h-[32px] bg-gradient-to-b from-[#815374] to-[#DBC7D5] rounded-xl">
          {" "}
        </span>
        <p className="italic text-2xl">{label}</p>
      </div>
      <Button variant={"secondary"} onClick={() => {
          if (callback) {
              callback();
          }
      }}>
        <Plus /> {buttonLabel}
      </Button>
    </div>
  );
}

export { ProfileSectionDivider };
