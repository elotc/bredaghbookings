"use client"

import { handleSignOut } from "@/lib/auth/signOutServerAction";
import { useRouter } from "next/navigation";

export function SignOutButton(props: {
    className?: string;
    children?: React.ReactNode;
}) {
    const defClass = "p-1 text-sm shadow-sm rounded-md bg-blue-300 text-white font-bold m-2 hover:bg-blue-700";

    return (
        
            <button className={props.className || defClass} onClick={
                () => handleSignOut()
            }>{props.children || "Sign Out"}</button>

    );
}