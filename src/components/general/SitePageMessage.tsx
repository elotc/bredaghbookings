"use client";

import Link from "next/link";
import { RxCheckCircled, RxExclamationTriangle } from "react-icons/rx";

export default function SitePageMessage({
    headline,
    message,
    label,
    link,
    isError = false,
    actionBtnLabel,
    btnAction
}:
    { headline: string, message: string, label: string, link: string, isError?: boolean, actionBtnLabel?: string, btnAction?: () => void }) {
    return (
        <div className="grid grid-cols-3 mt-40">
            <div className="col-start-2 rounded-sm p-2 shadow-sm text-center">
                <div className="flex flex-col items-center">
                    {!isError && <RxCheckCircled className="text-yellow-500 text-6xl" />}
                    {isError && <RxExclamationTriangle className="text-red-500 text-6xl" />}
                    <div className="">
                        <h2 className="mb-4 text-xl font-bold md:text-2xl">
                            {headline}
                        </h2>
                    </div>
                    <div className="p-4">
                        <p className="text-sm md:text-base">
                            {message}
                        </p>
                        <p className="m-6">
                            <Link className="text-bredagh-white hover:underline" href={link}>{label}</Link>
                        </p>
                    </div>
                    {btnAction && actionBtnLabel && (
                        <button type="button" onClick={btnAction} className="mt-4 rounded bg-gray-500 px-4 py-2 font-semibold text-white hover:bg-gray-600">
                            {actionBtnLabel}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}
