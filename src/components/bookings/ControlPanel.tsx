"use client";

import { EndEarlierIcon, EndLaterIcon, NextDayIcon, NextWeekIcon, PrevDayIcon, PrevWeekIcon, StartEarlierIcon, StartLaterIcon } from "@/components/bookings/ControlPanelIcons";

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

export function TimePeriodBtn({label, startHour, setStartHour, endHour, setEndHour}: 
    {
        label: string, 
        startHour: number, 
        setStartHour: (hour: number) => void, 
        endHour: number, 
        setEndHour: (hour: number) => void
    }) 
{
    return (
        <button 
            type="button" 
            className="bg-gray-200 w-2/3 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-1 rounded shadow-md text-sm"
            onClick={() => {setStartHour(startHour);setEndHour(endHour);}}>
            {label}
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
    const sevenDays = 604800000;
    const oneDay = 86400000;
    return (
        <div className="border-1 p-2 border-gray-400">
            <div className="relative flex pt-1 pb-2 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Control Planel</span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="grid grid-cols-3 items-center justify-items-center mb-2">
                <TimePeriodBtn label="Morning" startHour={9} setStartHour={setStartHour} endHour={13} setEndHour={setEndHour} /> 
                <TimePeriodBtn label="Afternoon" startHour={13} setStartHour={setStartHour} endHour={17} setEndHour={setEndHour} /> 
                <TimePeriodBtn label="Evening" startHour={17} setStartHour={setStartHour} endHour={21} setEndHour={setEndHour} /> 
            </div>
            <div className="grid grid-cols-2 justify-items-center">
                <p>Start date: {startDate.toLocaleDateString()}</p>
                <p>End date: {endDate.toLocaleDateString()}</p>
                <h2 className="text-xs text-center text-gray-800">Hour control</h2>
                <h2 className="text-xs text-center text-gray-800">Day/week control</h2>
                <div className="grid-rows-1 flex justify-center">
                    <div className="flex justify-center items-center gap-1 m-1">
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
                        <div className="flex space-1">
                            <ControlBtn 
                                action={() => setFocusDate(new Date(focusDate.getTime() - sevenDays))}
                                disabled={(new Date(focusDate.getTime() - sevenDays) < startDate)}
                                title="Previous week"
                            >
                                <PrevWeekIcon />
                            </ControlBtn>
                        </div>
                        <div className="flex space-1">
                            <ControlBtn 
                                action={() => setFocusDate(new Date(focusDate.getTime() - oneDay))}
                                disabled={(new Date(focusDate.getTime() - oneDay) < startDate)}
                                title="Previous day"
                            >
                                <PrevDayIcon />
                            </ControlBtn>
                        </div>
                        <div className="flex space-1">
                            <ControlBtn 
                                action={() => setFocusDate(new Date(focusDate.getTime() + oneDay))}
                                disabled={(endDate < new Date(focusDate.getTime() + oneDay))}
                                title="Next day"
                            >
                                <NextDayIcon />
                            </ControlBtn>
                        </div>
                        <div className="flex space-1">
                            <ControlBtn 
                                action={() => setFocusDate(new Date(focusDate.getTime() + sevenDays))}
                                disabled={(endDate < new Date(focusDate.getTime() + sevenDays))}
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