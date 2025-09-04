"use client";

import { EndEarlierIcon, EndLaterIcon, NextDayIcon, NextWeekIcon, PrevDayIcon, PrevWeekIcon, StartEarlierIcon, StartLaterIcon } from "@/components/bookings/ControlPanelIcons";
import { getOneDayBackFromDate, getOneDayForwardFromDate, getOneWeekBackFromDate, getOneWeekForwardFromDate } from "@/lib/schedule/dateTimeUtils";
import { get } from "http";

export function ControlBtn({ children, action, title, disabled }: { children: React.ReactNode, action: () => void, title: string, disabled?: boolean }) {
    return (
        <button
            type="button"
            onClick={action}
            disabled={disabled}
            title={title}
            className={`
                inline-flex items-center px-1 py-1 
                text-sm font-medium text-center text-white shadow-md
                bg-gray-200
                hover:bg-gray-400 
                focus:ring-2 focus:outline-none focus:ring-gray-300 
                dark:bg-blue-400 
                dark:hover:bg-blue-500 
                dark:focus:ring-blue-600
                ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
            `}
        >
            {children}
        </button>
    );
}

export function TimePeriodBtn({ label, startHour, setStartHour, endHour, setEndHour }:
    {
        label: string,
        startHour: number,
        setStartHour: (hour: number) => void,
        endHour: number,
        setEndHour: (hour: number) => void
    }) {
    return (
        <button
            type="button"
            className="
            px-2
            text-xs font-medium text-center text-white shadow-md
            bg-gray-200
            hover:bg-gray-400 
            focus:ring-2 focus:outline-none focus:ring-gray-300 
            dark:bg-blue-400 
            dark:hover:bg-blue-500 
            dark:focus:ring-blue-600
            rounded"
            onClick={() => { setStartHour(startHour); setEndHour(endHour); }}>
            <span className="hidden md:inline">{label}</span>
            <span className="inline md:hidden">{label.slice(0,2)}</span>
        </button>
    );
}

export function ControlPanel(
    { startHour, setStartHour, endHour, setEndHour, focusDate, setFocusDate, startDate, endDate }:
        {
            startHour: number,
            setStartHour: (hour: number) => void,
            endHour: number,
            setEndHour: (hour: number) => void,
            startDate: Date,
            focusDate: Date,
            setFocusDate: (date: Date) => void,
            endDate: Date
        }) {

    return (
        <div className="border-1 p-2 border-gray-400">
            <div className="relative flex pt-1 pb-2 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Control Planel</span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <div className="grid grid-cols-3 justify-items-center">
                <div className="grid-rows-1 flex justify-center">
                    <div className="flex justify-center items-center gap-1 m-1">
                        <h2 className="text-xs text-center hidden md:block">Time period</h2>
                        <div className="flex space-1">
                            <TimePeriodBtn label="Morning" startHour={9} setStartHour={setStartHour} endHour={13} setEndHour={setEndHour} />
                        </div>
                        <div className="flex space-1">
                            <TimePeriodBtn label="Afternoon" startHour={13} setStartHour={setStartHour} endHour={17} setEndHour={setEndHour} />
                        </div>
                        <div className="flex space-1">
                            <TimePeriodBtn label="Evening" startHour={17} setStartHour={setStartHour} endHour={21} setEndHour={setEndHour} />
                        </div>
                    </div>
                </div>

                <div className="grid-rows-1 flex justify-center">
                    <div className="flex justify-center items-center gap-1 m-1">
                        <h2 className="text-xs text-center hidden md:block">Hour control</h2>
                        <div className="flex space-1">
                            <ControlBtn
                                action={() => setStartHour(startHour - 1)}
                                disabled={startHour <= 0}
                                title="Start earlier"
                            >
                                <StartEarlierIcon />
                            </ControlBtn>
                        </div>
                        <div className="flex space-1">
                            <ControlBtn
                                action={() => setStartHour(startHour + 1)}
                                disabled={startHour >= endHour - 1}
                                title="Start later"
                            >
                                <StartLaterIcon />
                            </ControlBtn>
                        </div>
                        <div className="flex space-1">
                            <ControlBtn
                                action={() => setEndHour(endHour + 1)}
                                disabled={endHour >= 24}
                                title="End later"
                            >
                                <EndLaterIcon />
                            </ControlBtn>
                        </div>
                        <div className="flex space-1">
                            <ControlBtn
                                action={() => setEndHour(endHour - 1)}
                                disabled={endHour <= startHour + 1}
                                title="End earlier"
                            >
                                <EndEarlierIcon />
                            </ControlBtn>
                        </div>
                    </div>
                </div>


                <div className="grid-rows-1 flex justify-center">
                    <div className="flex justify-center items-center gap-1 m-1">
                        <h2 className="text-xs text-center hidden md:block">Day/week control</h2>
                        <div className="flex space-1">
                            <ControlBtn
                                action={() => setFocusDate(getOneWeekBackFromDate(focusDate))}
                                disabled={(getOneWeekBackFromDate(focusDate) < startDate)}
                                title="Previous week"
                            >
                                <PrevWeekIcon />
                            </ControlBtn>
                        </div>
                        <div className="flex space-1">
                            <ControlBtn
                                action={() => setFocusDate(getOneDayBackFromDate(focusDate))}
                                disabled={(getOneDayBackFromDate(focusDate) < startDate)}
                                title="Previous day"
                            >
                                <PrevDayIcon />
                            </ControlBtn>
                        </div>
                        <div className="flex space-1">
                            <ControlBtn
                                action={() => setFocusDate(getOneDayForwardFromDate(focusDate))}
                                disabled={(endDate < getOneDayForwardFromDate(focusDate))}
                                title="Next day"
                            >
                                <NextDayIcon />
                            </ControlBtn>
                        </div>
                        <div className="flex space-1">
                            <ControlBtn
                                action={() => setFocusDate(getOneWeekForwardFromDate(focusDate))}
                                disabled={(endDate < getOneWeekForwardFromDate(focusDate))}
                                title="Next week"
                            >
                                <NextWeekIcon />
                            </ControlBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}