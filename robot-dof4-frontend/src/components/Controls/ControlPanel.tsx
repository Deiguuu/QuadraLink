import { useRobotStore } from "../../store/useRobotStore";
import VolumeSlider from "./VolumeSlider";

export default function ControlPanel() {
    const {
        base,
        hombro,
        codo,
        pinza,
        setBase,
        setHombro,
        setCodo,
        setPinza,
    } = useRobotStore();

    return (
        <div className="absolute left-6 top-6 w-[320px] bg-[#F9F9FB]/90 backdrop-blur-xl p-7 rounded-[2.5rem] shadow-xl space-y-7">

            {/* HEADER */}
            <div className="text-center">
                <h2 className="text-[22px] font-bold text-black">
                    Centro de control
                </h2>
                <p className="text-[14px] text-gray-500">DOF4</p>
            </div>

            {/* SLIDERS */}
            <div className="space-y-5">
                <VolumeSlider label="Base" value={base} minDegree={-180} maxDegree={180} onChange={setBase} />
                <VolumeSlider label="Hombro" value={hombro} minDegree={-180} maxDegree={180} onChange={setHombro} />
                <VolumeSlider label="Codo" value={codo} minDegree={-180} maxDegree={180} onChange={setCodo} />
                <VolumeSlider label="Pinza" value={pinza} minDegree={-180} maxDegree={180} onChange={setPinza} />
            </div>
        </div>
    );
}