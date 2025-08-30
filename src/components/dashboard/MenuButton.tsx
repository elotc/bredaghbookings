import ButtonCounter from "./ButtonCounter";

export type MenuButtonType = 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven';

export default function MenuButton({ type, label, onClick, count }: { type: MenuButtonType, label: string, onClick: () => void, count?: number }) {

    return (
        <>
            <button
                className={`w-full max-w-md py-6 sm:py-8 rounded-lg text-lg sm:text-2xl font-bold shadow-lg border-2 transition-colors ${getClass(type)}`}
                onClick={onClick}
            >
                {label}
                {count !== undefined && <ButtonCounter label="Pending" count={count} type={'info'} />}
            </button>
        </>
    );
}

function getClass(type: MenuButtonType) {
    const borderClass = " border-1 border-gray-500 dark:border-white";
    const textClass = " text-white";
    switch (type) {
        case 'one':
            return "bg-cyan-500 hover:bg-cyan-900" + textClass + borderClass;
        case 'two':
            return "bg-orange-500 hover:bg-orange-300" + textClass + borderClass;
        case 'three':
            return "bg-amber-500 hover:bg-amber-300" + textClass + borderClass;
        case 'four':
            return "bg-lime-500 hover:bg-lime-300" + textClass + borderClass;
        case 'five':
            return "bg-teal-500 hover:bg-teal-300" + textClass + borderClass;
        case 'six':
            return "bg-sky-500 hover:bg-sky-300" + textClass + borderClass;
        case 'seven':
            return "bg-violet-500 hover:bg-violet-300" + textClass + borderClass;
    }
}


