import {useState} from "react";


function FormSidebar() {
    const [selected, setSelected] = useState<string | null>(null)
    const [isSelected, setIsSelected] = useState<boolean>(false)

    return (
        <div className="w-64 h-full p-4">
            {selected}
            <nav>
                <ul className="space-y-2">


                    <li className={"data-[selected=true]:bg-[#F4F4F5] rounded-md px-4 py-2 text-left hover:bg-[#E4E4E7]"}
                        data-selected={selected === "Overview"}>
                        <div className="hover:underline"
                             onClick={() => setSelected("Overview")}
                             aria-selected={isSelected}>
                            Overview
                        </div>
                    </li>
                    <li className={"data-[selected=true]:bg-[#F4F4F5] rounded-md px-4 py-2 text-left hover:bg-[#E4E4E7]"}
                        data-selected={selected === "MyProfile"}>
                        <div className="hover:underline" onClick={() => setSelected("MyProfile")}>
                            My Profile
                        </div>
                    </li>
                    <li className={"data-[selected=true]:bg-[#F4F4F5] rounded-md px-4 py-2 text-left hover:bg-[#E4E4E7]"}
                        data-selected={selected === "MyHorses"}>
                        <div className="hover:underline" onClick={() => setSelected("MyHorses")}>
                            My Horse(s)
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export {FormSidebar}