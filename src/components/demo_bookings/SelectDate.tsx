import { inputClass, labelClass } from "./IdStringDropDown";

export function SelectDate({
    selectedDate,
    setSelectedDate
}: {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
}) {
    return (
        <div>
            <label htmlFor="date" className={labelClass}>
                Date
            </label>
            <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className={inputClass}
            />
        </div>
    );
};