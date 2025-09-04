import { PencilIcon, PlusIcon, TrashIcon, DocumentDuplicateIcon, CalendarDaysIcon, TicketIcon } from "@heroicons/react/16/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export const StdTabClass = "min-w-full rounded shadow";

const thClass = "py-2 px-2 border-b text-left";
const tdClass = "py-1 px-1 border-b";
const tdActionClass = "py-0 px-1 border-b";
const tableButtonClass = "inline-flex justify-between items-center mb-1 mx-1 px-2 py-2 rounded hover:bg-black hover:text-yellow-300 transition-colors";
const tableActionButtonClass = "inline-flex justify-between items-center m-1 px-2 py-2 rounded bg-gray-500 text-white font-semibold hover:bg-black hover:text-yellow-300 transition-colors";
const createButtonClass = "flex justify-between items-center mb-1 px-2 py-1 rounded bg-[#003366] text-[#FFD700] font-semibold hover:bg-[#002244] hover:text-yellow-300 transition-colors"

export function StdTabTitle({ title, createPageLink, error }: { title: string, createPageLink?: string, error?: string | null }) {
    return (
        <div>
            {error && <StdTabError error={error} />}
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold">{title}</h1>
                {createPageLink && <StdTabAddBtn createPageLink={createPageLink} />}
            </div>
        </div>
    );
}

// == Block Buttons ==
export function StdTabAddBtn({ createPageLink }: { createPageLink: string }) {
    return (
        <Link href={createPageLink} className={createButtonClass}>
            <span className="hidden md:block">Create</span>
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function StdTabNavBtn({ ref, label = "Back" }: { ref: string, label?: string }) {
    return (
        <Link 
            href={ref} 
            className="p-2 m-2 rounded 
            bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
            <span className="">{label}</span>
        </Link>
    );
}

// == Inline Buttons ==
export function StdTabUpdInlBtn({ updatePageLink }: { updatePageLink: string }) {
    return (
        <Link href={updatePageLink} className={tableActionButtonClass} title="Edit">
            <span className="md:block hidden">Edit</span><PencilIcon className="h-5" />
        </Link>
    );
}

export function StdTabCalInlBtn({ pageLink }: { pageLink: string }) {
    return (
        <Link href={pageLink} className={tableActionButtonClass} title="View Calendar">
            <span className="md:block hidden">Calendar</span><CalendarDaysIcon className="h-5" />
        </Link>
    );
}

export function StdTabBkgInlBtn({ pageLink }: { pageLink: string }) {
    return (
        <Link href={pageLink} className={tableActionButtonClass} title="View Booking">
            <span className="md:block hidden">Bookings</span><TicketIcon className="h-5" />
        </Link>
    );
}

export function StdTabNavInlBtn({ actionName, actionPageLink, count }: { actionName: string, actionPageLink: string, count?: number }) {
    return (
        <Link href={actionPageLink} className={tableActionButtonClass}>
            <span className="block text-sm">{actionName}</span>
            {count !== undefined && (
                <span className={`ml-1 text-xs ${count > 0 ? "bg-yellow-200 text-black" : "bg-gray-200 text-gray-800"} px-2 py-1 rounded-full`}>
                    {count}
                </span>
            )}
        </Link>
    );
}

export function StdTabDelInlBtn({ id, deleteAction, onError, primaryId }
    : { 
        id: number, 
        deleteAction: (id: number, primaryId?: number) => Promise<any>, 
        onError: Function, primaryId?: number }) {

    const deleteActionWithId = deleteAction.bind(null, id, primaryId);
    return (
        <button type="submit" className={tableButtonClass} title="Delete"
            onClick={async () => {
                const result = await deleteActionWithId();
                if (result && result.error && onError) { onError(result.error); }
            }}>
            <TrashIcon className="h-5" />
        </button>
    );
}

export function StdTabDelStrInlBtn({ id, deleteAction, onError, primaryId }
    : { 
        id: string, 
        deleteAction: (id: string, primaryId?: string) => Promise<any>, 
        onError: Function, primaryId?: string }) {

    const deleteActionWithId = deleteAction.bind(null, id, primaryId);
    return (
        <button type="submit" className={tableButtonClass} title="Delete"
            onClick={async () => {
                const result = await deleteActionWithId();
                if (result && result.error && onError) { onError(result.error); }
            }}>
            <TrashIcon className="h-5" />
        </button>
    );
}

export function StdTabDupInlBtn({ id, duplicateAction, onError, primaryId }
    : { 
        id: number, 
        duplicateAction: (id: number, primaryId?: number) => Promise<any>, 
        onError: Function, 
        primaryId?: number }) {

    const duplicateActionWithId = duplicateAction.bind(null, id, primaryId);
    return (
        <button type="submit" className={tableButtonClass} title="Duplicate"
            onClick={async () => {
                const result = await duplicateActionWithId();
                if (result && result.error && onError) { onError(result.error); }
            }}>
            <DocumentDuplicateIcon className="h-5" />
        </button>
    );
}

// == Table Components ==
export function StdTabBtnBar({ children }: { children: React.ReactNode }) {
    return (<div className="flex justify-between items-center my-6">{children}</div>);
}

export function StdTabTh({ children }: { children: React.ReactNode }) {
    return <th className={thClass}>{children}</th>;
}

export function StdTabTd({ children }: { children: React.ReactNode }) {
    return <td className={tdClass}>{children}</td>;
}

export function StdTabClickTd({ children, onClick, className }: { children: React.ReactNode, onClick: () => void, className?: string }) {
    return <td onClick={onClick} className={`${tdClass} cursor-pointer hover:bg-blue-100 ${className}`}>{children}</td>;
}

export function StdTabActionTd({ children }: { children: React.ReactNode }) {
    return <td className={tdActionClass}>{children}</td>;
}

export function StdTabError({ error }: { error: string | null }) {
    return (
        <div className="flex items-center mb-2">
            <ExclamationCircleIcon className="h-6 w-6 inline-block mr-2 text-red-600" />
            <span className="font-bold text-lg text-red-600">{error}</span>
        </div>
    );
}
