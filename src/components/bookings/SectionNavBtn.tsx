export default function SectionNavBtn({ label, onClick }: { label: string; onClick: () => void }) {
    return (
        <button
            className="
                px-5 py-2
                rounded-lg
                bg-bredagh-maroon-600 text-bredagh-white font-semibold
                shadow-md transition
                hover:bg-bredagh-accent hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-bredagh-accent focus:ring-offset-2
                border border-transparent
            "
            onClick={onClick}
        >
            {label}
        </button>
    );
}
