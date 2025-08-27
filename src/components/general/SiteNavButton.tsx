import Link from "next/link";

export function SiteNavBtnBar({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            {children}
        </div>
    );
}

export function SiteNavButton({ref, label }: { ref: string; label: string }) {
    return (
        <Link
            href={ref}
            className="
            flex p-2 m-2 rounded 
            justify-center items-center
            bg-gray-300 text-gray-800 font-semibold 
            hover:bg-gray-400
            "
        >
            <span className="flex justify-center items-center w-full text-center text-xs">{label}</span>
        </Link>
    );
}