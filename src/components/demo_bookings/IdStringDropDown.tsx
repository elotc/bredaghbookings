
export const labelClass = "block text-sm font-medium text-gray-500";
export const inputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm";


export function DropDownList({
    label,
    selectedItem,
    setSelectedItem,
    itemList
}: {
    label: string;
    selectedItem: string;
    setSelectedItem: (item: string) => void;
    itemList: { id: string; name: string }[];
}) {
    const tag = label.toLowerCase().replace(/\s+/g, '-');
    return (
        <div>
            <label htmlFor={tag} className={labelClass}>
                {label}
            </label>
            <select
                id={tag}
                value={selectedItem}
                onChange={e => setSelectedItem(e.target.value)}
                className={inputClass}
            >
                {itemList.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
};


