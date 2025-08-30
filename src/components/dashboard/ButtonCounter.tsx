export default function ButtonCounter({ label, count, type }: { label: string, count: number, type: string }) {

    let bgColor = '';
    if (type === 'alert') {
        bgColor = 'bg-red-600';
    } else if (type === 'warning') {
        bgColor = 'bg-yellow-500';
    } else if (type === 'info') {
        bgColor = 'bg-gray-500';
    }

    return (
        <span className={`inline-block ${bgColor} text-white text-base sm:text-xs font-semibold rounded-full px-1 sm:px-4 py-1 ml-1 sm:ml-4`}>
            {label}: {count}
        </span>
    );
}
