"use client"

import { useRouter } from "next/navigation";

export function SignInButton ( props: {
    className? : string;
    children?: React.ReactNode;
} ){
    const router = useRouter();
    const defClass = "p-1 text-sm shadow-sm rounded-md bg-blue-300 text-white font-bold m-2 hover:bg-blue-700";

    return(
        <button className={props.className || defClass} onClick={() => { 
            router.push("/auth/sign-in")
        }}>{props.children || "Sign In"}</button>
    );
}