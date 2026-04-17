interface Props {
    label: string;
    value: number;
    minDegree: number;
    maxDegree: number;
    onChange: (val: number) => void;
}

export default function VolumeSlider({
    label,
    value,
    minDegree,
    maxDegree,
    onChange,
}: Props) {

    const ratio = (value - minDegree) / (maxDegree - minDegree);
    const clampedRatio = Math.max(0, Math.min(1, ratio));

    // 🎯 Color dinámico tipo sistema
    let color = "#007AFF";
    if (clampedRatio > 0.85) color = "#FF3B30";
    else if (clampedRatio > 0.65) color = "#FF9F0A";

    return (
        <div className="space-y-1.5 flex flex-col">
            {/* LABEL */}
            <div className="flex justify-between px-1">
                <span className="text-sm font-semibold text-gray-600">
                    {label}
                </span>
                <span className="text-xs text-gray-500">
                    {value}°
                </span>
            </div>

            {/* TRACK */}
            <div className="relative w-full h-[36px] bg-[#EEEEF0] rounded-full shadow-inner overflow-hidden">

                {/* PROGRESS */}
                {clampedRatio > 0 && (
                    <div
                        className="absolute left-0 top-0 h-full rounded-full transition-all duration-100"
                        style={{
                            width: `${clampedRatio * 100}%`,
                            background: `linear-gradient(90deg, ${color}, ${color}CC)`
                        }}
                    />
                )}

                {/* THUMB */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border border-gray-200"
                    style={{
                        left: `calc(${clampedRatio * 100}% - 12px)`
                    }}
                />

                {/* INPUT */}
                <input
                    type="range"
                    min={minDegree}
                    max={maxDegree}
                    step={1}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
}