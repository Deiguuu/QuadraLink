import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { useRobotStore } from "../../store/useRobotStore";
import { lerp } from "../../utils/lerp";

export default function RobotDOF4() {
    const baseRef = useRef<Group>(null);
    const hombroRef = useRef<Group>(null);
    const codoRef = useRef<Group>(null);
    const pinzaRef = useRef<Group>(null);

    const { base, hombro, codo, pinza } = useRobotStore();

    useFrame(() => {
        if (baseRef.current)
            baseRef.current.rotation.y = lerp(baseRef.current.rotation.y, base, 0.1);

        if (hombroRef.current)
            hombroRef.current.rotation.z = lerp(hombroRef.current.rotation.z, hombro, 0.1);

        if (codoRef.current)
            codoRef.current.rotation.z = lerp(codoRef.current.rotation.z, codo, 0.1);

        if (pinzaRef.current)
            // La pinza suele rotar sobre el eje de la muñeca (puede ser Z o Y dependiendo de tu control)
            pinzaRef.current.rotation.z = lerp(pinzaRef.current.rotation.z, pinza, 0.1);
    });

    // Colores extraídos de la foto
    const colorAmarillo = "#FFB7D5";   // rosa kawaii
    const colorNegro = "#6C5B7B";      // morado grisáceo suave
    const colorServo = "#B5EAD7";      // verde menta pastel
    const colorTornillo = "#FFF5BA";   // amarillo vainilla

    return (
        <group position={[0, -1, 0]}>
            {/* ⬛ CAJA BASE (Electrónica inferior) */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[2.5, 0.8, 2.5]} />
                <meshStandardMaterial color={colorNegro} roughness={0.8} />
            </mesh>

            {/* 🟠 BASE GIRATORIA */}
            <group position={[0, 0.8, 0]}>
                {/* Parte estática de la base amarilla */}
                <mesh position={[0, 0.2, 0]}>
                    <cylinderGeometry args={[0.9, 1, 0.4, 32]} />
                    <meshStandardMaterial color={colorAmarillo} roughness={0.5} />
                </mesh>

                <group ref={baseRef}>
                    {/* Eje rotatorio negro de la base */}
                    <mesh position={[0, 0.55, 0]}>
                        <cylinderGeometry args={[0.7, 0.8, 0.3, 32]} />
                        <meshStandardMaterial color={colorNegro} roughness={0.6} />
                    </mesh>

                    {/* Soporte vertical en U (Hombro base) */}
                    <mesh position={[0, 1.1, 0]}>
                        <boxGeometry args={[0.6, 1.2, 0.8]} />
                        <meshStandardMaterial color={colorNegro} roughness={0.7} />
                    </mesh>

                    {/* 🔷 HOMBRO */}
                    <group ref={hombroRef} position={[0, 1.3, 0]}>
                        {/* Tornillo Hombro */}
                        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.41]}>
                            <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
                            <meshStandardMaterial color={colorTornillo} metalness={0.8} roughness={0.2} />
                        </mesh>

                        {/* Brazo 1 (Acrílico Negro) - Desplazado para pivotar desde abajo */}
                        <mesh position={[0, 1.2, 0]}>
                            <boxGeometry args={[0.4, 2.6, 0.5]} />
                            <meshStandardMaterial color={colorNegro} roughness={0.6} />
                        </mesh>

                        {/* Servo del codo anclado al final del Brazo 1 */}
                        <mesh position={[0, 2.4, 0.15]}>
                            <boxGeometry args={[0.5, 0.7, 0.8]} />
                            <meshStandardMaterial color={colorServo} roughness={0.5} />
                        </mesh>

                        {/* 🟢 CODO */}
                        <group ref={codoRef} position={[0, 2.4, 0]}>
                            {/* Tornillo Codo */}
                            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.41]}>
                                <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
                                <meshStandardMaterial color={colorTornillo} metalness={0.8} roughness={0.2} />
                            </mesh>

                            {/* Brazo 2 (Acrílico Negro) */}
                            <mesh position={[0, 1.1, 0]}>
                                <boxGeometry args={[0.35, 2.4, 0.45]} />
                                <meshStandardMaterial color={colorNegro} roughness={0.6} />
                            </mesh>

                            {/* Servo de la pinza anclado al final del Brazo 2 */}
                            <mesh position={[0, 2.2, 0]}>
                                <boxGeometry args={[0.6, 0.5, 0.7]} />
                                <meshStandardMaterial color={colorServo} roughness={0.5} />
                            </mesh>

                            {/* 🔴 PINZA / GARRA */}
                            <group ref={pinzaRef} position={[0, 2.4, 0]}>
                                {/* Base de la pinza (Amarilla) */}
                                <mesh position={[0, 0.2, 0]}>
                                    <boxGeometry args={[1.2, 0.2, 0.6]} />
                                    <meshStandardMaterial color={colorAmarillo} roughness={0.5} />
                                </mesh>

                                {/* Engranajes/Mecanismo central */}
                                <mesh position={[0, 0.4, 0]}>
                                    <boxGeometry args={[0.4, 0.3, 0.4]} />
                                    <meshStandardMaterial color={colorAmarillo} roughness={0.5} />
                                </mesh>

                                {/* Garra Izquierda (Forma de gancho) */}
                                <group position={[0.4, 0.3, 0]}>
                                    {/* Segmento recto */}
                                    <mesh position={[0, 0.5, 0]} rotation={[0, 0, -0.2]}>
                                        <boxGeometry args={[0.15, 1.2, 0.2]} />
                                        <meshStandardMaterial color={colorAmarillo} roughness={0.5} />
                                    </mesh>
                                    {/* Punta hacia adentro */}
                                    <mesh position={[-0.15, 1.05, 0]} rotation={[0, 0, Math.PI / 2]}>
                                        <boxGeometry args={[0.15, 0.4, 0.2]} />
                                        <meshStandardMaterial color={colorAmarillo} roughness={0.5} />
                                    </mesh>
                                </group>

                                {/* Garra Derecha (Forma de gancho) */}
                                <group position={[-0.4, 0.3, 0]}>
                                    {/* Segmento recto */}
                                    <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0.2]}>
                                        <boxGeometry args={[0.15, 1.2, 0.2]} />
                                        <meshStandardMaterial color={colorAmarillo} roughness={0.5} />
                                    </mesh>
                                    {/* Punta hacia adentro */}
                                    <mesh position={[0.15, 1.05, 0]} rotation={[0, 0, Math.PI / 2]}>
                                        <boxGeometry args={[0.15, 0.4, 0.2]} />
                                        <meshStandardMaterial color={colorAmarillo} roughness={0.5} />
                                    </mesh>
                                </group>

                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
}