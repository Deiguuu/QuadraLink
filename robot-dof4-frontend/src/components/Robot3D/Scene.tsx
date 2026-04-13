import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [5, 5, 5], fov: 60 }}
            style={{
                width: "100vw",
                height: "100vh",
                display: "block",
            }}
        >
            <color attach="background" args={["#0f172a"]} />

            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} />

            <axesHelper args={[5]} />
            <Grid args={[20, 20]} />

            <OrbitControls />
        </Canvas>
    );
}