interface Props {
    label: string;
    onClick: () => void;
}

export default function DockButton({ label, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="
                px-5 py-2
                bg-white/80
                rounded-2xl
                text-sm font-semibold text-gray-700
                shadow-md
                transition-all duration-150
                hover:scale-105
                active:scale-90
                hover:bg-white
            "
        >
            {label}
        </button>
    );
}