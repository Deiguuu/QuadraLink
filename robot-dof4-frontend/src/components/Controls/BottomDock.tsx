import { useRobotStore } from "../../store/useRobotStore";
import DockButton from "./DockButton";

export default function BottomDock() {
    const { setBase, setHombro, setCodo, setPinza } = useRobotStore();

    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">

            <div className="
                flex gap-3 px-4 py-3
                bg-white/70 backdrop-blur-2xl
                rounded-3xl
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                border border-white/40
            ">

                <DockButton
                    label="Home"
                    onClick={() => {
                        setBase(0);
                        setHombro(90);
                        setCodo(90);
                        setPinza(20);
                    }}
                />

                <DockButton
                    label="Pick"
                    onClick={() => {
                        setBase(30);
                        setHombro(60);
                        setCodo(120);
                        setPinza(10);
                    }}
                />

                <DockButton
                    label="Place"
                    onClick={() => {
                        setBase(-30);
                        setHombro(100);
                        setCodo(60);
                        setPinza(40);
                    }}
                />
            </div>
        </div>
    );
}