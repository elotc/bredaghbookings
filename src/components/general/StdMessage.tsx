import Link from "next/link";
import { InformationCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export function StdMsgError({ title, detail, ref }: { title: string, detail: string, ref?: string }) {
    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="bg-red-100 text-red-800 p-4 rounded mb-4 space-y-4 p-6 shadow">
                <div className="flex justify-center items-center mb-2">
                    <ExclamationCircleIcon className="h-6 w-6 inline-block mr-2" />
                    <span className="font-bold text-lg">{title}</span>
                </div>
                <p className="flex justify-center items-center mb-2">{detail}</p>
                {ref && (
                    <div className="flex justify-center items-center mb-2">
                        <Link className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                            href={ref} >
                            <span className="block">OK</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export function StdMsgNote({ label, text }: { label?: string, text: string }) {
    return (
        <div className="max-w-xl">
            <div className="flex border-l-4 border-gray-500 dark:bg-gray-600 bg-gray-100 p-1 m-2 rounded">
                <InformationCircleIcon className="h-5 w-5 inline-block mr-2" />
                {label && <p className="font-bold"> {label} - </p>}
                <p className="text-sm">{text}</p>
            </div>
        </div>
    );
}

