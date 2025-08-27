import Image from "next/image";

export function ControlPanelIcons({ file, alt }: { file: string, alt: string }) {
    return ( <Image src={file} alt={alt} width={20} height={20} className="" /> );
}

export function EndEarlierIcon() {
    return ( <ControlPanelIcons file="/end-earlier.svg" alt="End Earlier" /> );
}

export function EndLaterIcon() {
    return ( <ControlPanelIcons file="/end-later.svg" alt="End Later" /> );
}

export function NextDayIcon() {
    return ( <ControlPanelIcons file="/next-day.svg" alt="Next Day" /> );
}

export function NextWeekIcon() {
    return ( <ControlPanelIcons file="/next-week.svg" alt="Next Week" /> );
}

export function PrevDayIcon() {
    return ( <ControlPanelIcons file="/prev-day.svg" alt="Previous Day" /> );
}

export function PrevWeekIcon() {
    return ( <ControlPanelIcons file="/prev-week.svg" alt="Previous Week" /> );
}

export function StartEarlierIcon() {
    return ( <ControlPanelIcons file="/start-earlier.svg" alt="Start Earlier" /> );
}

export function StartLaterIcon() {
    return ( <ControlPanelIcons file="/start-later.svg" alt="Start Later" /> );
}
