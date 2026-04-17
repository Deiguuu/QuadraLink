import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";
import { useRobotStore } from "../../store/useRobotStore";
import { lerp } from "../../utils/lerp";

/**
 * Conversión grados → radianes
 */
const degToRad = (deg: number) => MathUtils.degToRad(deg);

export default function RobotDOF4() {
    const baseRef = useRef<Group>(null);
    const hombroRef = useRef<Group>(null);
    const codoRef = useRef<Group>(null);

    const garraIzqRef = useRef<Group>(null);
    const garraDerRef = useRef<Group>(null);

    const { base, hombro, codo, pinza } = useRobotStore();

    useFrame(() => {
        /**
         * BASE (Rotación Y)
         */
        if (baseRef.current) {
            baseRef.current.rotation.y = lerp(
                baseRef.current.rotation.y,
                degToRad(base),
                0.1
            );
        }

        /**
         * HOMBRO (Rotación Z)
         */
        if (hombroRef.current) {
            hombroRef.current.rotation.z = lerp(
                hombroRef.current.rotation.z,
                -degToRad(hombro),
                0.1
            );
        }

        /**
         * CODO (Rotación Z)
         */
        if (codoRef.current) {
            codoRef.current.rotation.z = lerp(
                codoRef.current.rotation.z,
                -degToRad(codo),
                0.1
            );
        }

        /**
         * PINZA (Lógica de cierre corregida)
         * Usamos el valor directamente para permitir que los grados negativos
         * junten las puntas de las garras.
         */
        const aperturaRad = degToRad(pinza);

        if (garraIzqRef.current) {
            // Rotación negativa para la izquierda
            garraIzqRef.current.rotation.z = lerp(
                garraIzqRef.current.rotation.z,
                -aperturaRad,
                0.15
            );
        }

        if (garraDerRef.current) {
            // Rotación positiva para la derecha (se encuentran al centro)
            garraDerRef.current.rotation.z = lerp(
                garraDerRef.current.rotation.z,
                aperturaRad,
                0.15
            );
        }
    });

    // Colores
    const colorAmarillo = "#FFB7D5";
    const colorNegro = "#6C5B7B";
    const colorServo = "#B5EAD7";

    return (
        <group position={[0, -1, 0]}>
            {/* BASE ESTRUCTURA */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[2.5, 0.8, 2.5]} />
                <meshStandardMaterial color={colorNegro} />
            </mesh>

            <group position={[0, 0.8, 0]}>
                <mesh position={[0, 0.2, 0]}>
                    <cylinderGeometry args={[0.9, 1, 0.4, 32]} />
                    <meshStandardMaterial color={colorAmarillo} />
                </mesh>

                {/* EJE BASE */}
                <group ref={baseRef}>
                    <mesh position={[0, 0.55, 0]}>
                        <cylinderGeometry args={[0.7, 0.8, 0.3, 32]} />
                        <meshStandardMaterial color={colorNegro} />
                    </mesh>

                    <mesh position={[0, 1.1, 0]}>
                        <boxGeometry args={[0.6, 1.2, 0.8]} />
                        <meshStandardMaterial color={colorNegro} />
                    </mesh>

                    {/* EJE HOMBRO */}
                    <group ref={hombroRef} position={[0, 1.3, 0]}>
                        <mesh position={[0, 1.2, 0]}>
                            <boxGeometry args={[0.4, 2.6, 0.5]} />
                            <meshStandardMaterial color={colorNegro} />
                        </mesh>

                        <mesh position={[0, 2.4, 0.15]}>
                            <boxGeometry args={[0.5, 0.7, 0.8]} />
                            <meshStandardMaterial color={colorServo} />
                        </mesh>

                        {/* EJE CODO */}
                        <group ref={codoRef} position={[0, 2.4, 0]}>
                            <mesh position={[0, 1.1, 0]}>
                                <boxGeometry args={[0.35, 2.4, 0.45]} />
                                <meshStandardMaterial color={colorNegro} />
                            </mesh>

                            <mesh position={[0, 2.2, 0]}>
                                <boxGeometry args={[0.6, 0.5, 0.7]} />
                                <meshStandardMaterial color={colorServo} />
                            </mesh>

                            {/* EJE PINZA (EFECTOR FINAL) */}
                            <group position={[0, 2.4, 0]}>
                                <mesh position={[0, 0.2, 0]}>
                                    <boxGeometry args={[1.2, 0.2, 0.6]} />
                                    <meshStandardMaterial color={colorAmarillo} />
                                </mesh>

                                {/* GARRA IZQUIERDA */}
                                <group ref={garraIzqRef} position={[0.4, 0.3, 0]}>
                                    <mesh position={[0, 0.5, 0]}>
                                        <boxGeometry args={[0.15, 1.2, 0.2]} />
                                        <meshStandardMaterial color={colorAmarillo} />
                                    </mesh>
                                </group>

                                {/* GARRA DERECHA */}
                                <group ref={garraDerRef} position={[-0.4, 0.3, 0]}>
                                    <mesh position={[0, 0.5, 0]}>
                                        <boxGeometry args={[0.15, 1.2, 0.2]} />
                                        <meshStandardMaterial color={colorAmarillo} />
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