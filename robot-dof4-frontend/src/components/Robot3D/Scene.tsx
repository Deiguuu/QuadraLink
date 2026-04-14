import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, ContactShadows } from "@react-three/drei";
import RobotDOF4 from "./RobotDOF4";

/**
 * Componente principal de la escena del simulador.
 * Configura el entorno 3D, iluminación, sombras y controles de cámara.
 */
export default function Scene() {
    return (
        <Canvas
            shadows
            camera={{ position: [8, 6, 8], fov: 50 }}
            style={{
                width: "100vw",
                height: "100vh",
                display: "block",
            }}
        >
            {/* Configuracion del color de fondo del entorno (Gris neutro industrial) */}
            <color attach="background" args={["#d1d5db"]} />

            {/* Iluminacion Global: Aporta una base de luz uniforme a toda la escena */}
            <ambientLight intensity={0.4} />

            {/* Luz Direccional: Fuente de luz principal encargada de generar sombras proyectadas */}
            <directionalLight
                castShadow
                position={[5, 12, 5]}
                intensity={1.0}
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0001}
            />

            {/* Luz de Punto: Aporta volumen y resalta los bordes de los materiales del robot */}
            <pointLight position={[-5, 5, -5]} intensity={0.6} color="#ffffff" />

            {/* Referencia visual de los ejes cartesianos (X: Rojo, Y: Verde, Z: Azul) */}
            <axesHelper args={[3]} />

            {/* Rejilla de referencia tecnica (Grid) con efecto de desvanecimiento en la distancia */}
            <Grid
                position={[0, -0.01, 0]}
                args={[40, 40]}
                cellSize={1}
                cellThickness={0.8}
                cellColor="#A0E7E5"
                sectionSize={5}
                sectionThickness={1.5}
                sectionColor="#4b5563"
                fadeDistance={40}
                fadeStrength={1}
            />

            {/* Sombras de contacto suaves para mejorar la percepcion de profundidad en el suelo */}
            <ContactShadows
                position={[0, 0, 0]}
                opacity={0.5}
                scale={20}
                blur={2.5}
                far={4}
                resolution={512}
                color="#000000"
            />

            {/* Estructura del pedestal: Proporciona una base solida de anclaje para el brazo robotico */}
            <group position={[0, 0, 0]}>
                {/* Cuerpo principal del pedestal */}
                <mesh receiveShadow position={[0, 0.1, 0]}>
                    <cylinderGeometry args={[2.5, 2.7, 0.2, 64]} />
                    <meshStandardMaterial color="#FFF5BA" metalness={0.5} roughness={0.3} />
                </mesh>
                {/* Elemento visual de seguridad perimetral */}
                <mesh receiveShadow position={[0, 0.25, 0]}>
                    <cylinderGeometry args={[1.8, 2.0, 0.1, 64]} />
                    <meshStandardMaterial color="#FFB7D5" metalness={0.2} roughness={0.5} />
                </mesh>
            </group>

            {/* Instancia del modelo del Robot: Posicionado sobre el pedestal */}
            <group position={[0, 0.3, 0]}>
                <RobotDOF4 />
            </group>

            {/* Controles de navegacion: Gestion de rotacion, zoom y limites de movimiento de camara */}
            <OrbitControls
                target={[0, 1.5, 0]}
                enableDamping
                dampingFactor={0.05}
                maxPolarAngle={Math.PI / 2.1} // Limita la camara para evitar que traspase el plano del suelo
                minDistance={4}
                maxDistance={18}
            />
        </Canvas>
    );
}