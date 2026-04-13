import Scene from "../components/Robot3D/Scene";

export default function Dashboard() {
    return (
        <div className="w-screen h-screen overflow-hidden">
            <div className="w-full h-full">
                <Scene />
            </div>
        </div>
    );
}