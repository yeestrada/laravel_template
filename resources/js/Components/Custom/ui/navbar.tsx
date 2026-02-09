// "use client"
//

//Used as a template due to the amount of required imports.

// import {Button} from "@/components/ui/button";
// import {MiniNav} from "@/components/ui/mininav";
// import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
// import ThemeToggle from "@/components/theme/theme-toggle";
// import Image from "next/image";
// import logo from "../../../public/WEC_Horizontal_Black.png"
// import {ShoppingCart} from "lucide-react"
// import Link from "next/link"
//
// function Navbar({appName}: {appName: string, }) {
//     return (
//         <header className={"mx-4 mt-6"}>
//             <div className="border rounded-2xl shadow-sm">
//                 <div className="flex justify-between items-center py-2 px-6">
//                     <div className="flex gap-20">
//                         <div className="flex items-center justify-between gap-4">
//                             <Image src={logo} alt="WEC Logo" height={60}/>
//                             <span className={"h-6 w-[2px] bg-[#D4D4D8]"}></span>
//                             <p className={"whitespace-nowrap font-medium hover:text-WEC-Purple"}>EquiForge - {appName}</p>
//                         </div>
//                         <MiniNav/>
//                     </div>
//                     <div className="flex items-center gap-4">
//                         <SignedOut>
//                             <SignInButton mode="modal">
//                                 <button className="px-3 py-1.5  bg-purple-600 text-white rounded-lg hover:bg-purple-700">
//                                     {`Sign In`}
//                                 </button>
//                             </SignInButton>
//                         </SignedOut>
//                         <SignedIn>
//                             <UserButton/>
//                         </SignedIn>
//                         <ThemeToggle/>
//                         <Link href="/cart">
//                             <Button variant="outline">
//                                 <ShoppingCart/>
//                                 Cart
//                             </Button>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     )
// }
//
// export {Navbar}