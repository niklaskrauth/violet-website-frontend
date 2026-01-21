import React, {useMemo, useRef, useState} from "react";
import {OrbitControls} from "@react-three/drei";
import {Bloom, EffectComposer, SSAO, Vignette} from "@react-three/postprocessing";
import * as THREE from "three";
import {Canvas, useFrame} from "@react-three/fiber";
import {useGlbModelLoader} from "../../utils/modelLoader.ts";
import {useNavigate} from "react-router-dom";

const Crystal = ({ object, position, rotation, route, onHover, onClick }: { 
    object: THREE.Object3D, 
    position: [number, number, number], 
    rotation?: [number, number, number], 
    route?: string, 
    onHover: (label: string | null) => void,
    onClick: (route: string | undefined, position: [number, number, number]) => void 
}) => {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef<THREE.Group>(null);

    const label = useMemo(() => {
        if (!route) return null;
        if (route === "/") return "HOME";
        return route.replace("/", "").toUpperCase();
    }, [route]);

    useFrame(() => {
        if (!meshRef.current) return;
        
        // Smooth transition for scale
        const targetScale = hovered ? 1.2 : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Smooth transition for position (upward movement)
        const targetY = hovered ? position[1] + 0.2 : position[1];
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    });

    return (
        <group
            ref={meshRef}
            position={position}
            rotation={rotation}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                onHover(label);
                document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
                setHovered(false);
                onHover(null);
                document.body.style.cursor = "auto";
            }}
            onClick={() => onClick(route, position)}
        >
            <primitive object={object} position={[0,0,0]} rotation={[0,0,0]} />
        </group>
    );
};

const AnimatedGroup = ({ children }: { children: React.ReactNode, onCrystalHover: (label: string | null) => void }) => {
    const navigate = useNavigate();
    const groupRef = useRef<THREE.Group>(null);
    const [exitDirection, setExitDirection] = useState<THREE.Vector3 | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const targetPosition = useRef(new THREE.Vector3(0, -2.5, 0));

    useFrame(() => {
        if (!groupRef.current) return;

        if (isAnimating && exitDirection) {
            // Smoothly interpolate towards a target position far outside the screen
            // Reduced lerp factors to make the animation slower
            groupRef.current.position.lerp(targetPosition.current, 0.03);
            
            // Add a scaling effect for a "sucking out" or "receding" feel
            groupRef.current.scale.lerp(new THREE.Vector3(0.5, 0.5, 0.5), 0.02);

            // Add a slight tilt to the movement to make it look less robotic
            const tiltTarget = exitDirection.x !== 0 ? -exitDirection.x * 0.2 : 0.1;
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, tiltTarget, 0.02);
        }
    });

    const handleCrystalClick = (route: string | undefined, position: [number, number, number]) => {
        if (isAnimating) return; // Prevent multiple clicks during animation

        const [x] = position;
        const direction = new THREE.Vector3(0, 0, 0);
        const distance = 20; // Distance to move outside

        if (x < -0.1) {
            direction.set(distance, 0, 0);
        } else if (x > 0.1) {
            direction.set(-distance, 0, 0);
        } else {
            direction.set(0, -distance, 0);
        }

        setExitDirection(direction);
        const currentPos = groupRef.current?.position || new THREE.Vector3(0, -2.5, 0);
        targetPosition.current.set(
            currentPos.x + direction.x,
            currentPos.y + direction.y,
            currentPos.z + direction.z
        );
        setIsAnimating(true);

        if (route) {
            setTimeout(() => {
                navigate(route);
            }, 2500);
        }
    };

    // Provide handleCrystalClick to children via React.Children.map if we wanted to be generic,
    // but here we can just pass it down manually in SceneCanvas.
    // To keep it simple and avoid complex React.cloneElement logic for now, 
    // I'll just move the group logic into SceneCanvas or pass the handler.
    return (
        <group ref={groupRef} position={[0, -2.5, 0]}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {

                    // @ts-ignore
                    return React.cloneElement(child, { onClick: handleCrystalClick });
                }
                return child;
            })}
        </group>
    );
}

const SceneCanvas = ({ onCrystalHover }: { onCrystalHover: (label: string | null) => void }) => {

    const outer_crystal = useGlbModelLoader({ modelName: "outer-Crystal_a" });
    const broken_ring = useGlbModelLoader({ modelName: "Broken_ring" });
    const innerCrystal = useGlbModelLoader({ modelName: "inner_Crystal_a" });

    const outer_crystalClones = useMemo(() => {
        if (!outer_crystal) return [];
        return Array.from({ length: 5 }, () => {
            return outer_crystal.clone();
        });
    }, [outer_crystal]);

    const innerCrystalClones = useMemo(() => {
        if (!innerCrystal) return [];
        return Array.from({ length: 5 }, () => {
            return innerCrystal.clone();
        });
    }, [innerCrystal]);

    return (
        <div
            style={{ zIndex: 1, position: 'absolute', inset: 0 }}
        >
            <Canvas
                className="fixed inset-0"
                camera={{ position: [0, 5, 5], fov: 60 }}
                shadows
                gl={{ antialias: true }}
            >

                <ambientLight intensity={0.5} color={"#ffb616"} />
                <directionalLight
                    position={[2, 2, 2]}
                    intensity={.5}
                    color={"#fff4cc"}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />


                <AnimatedGroup onCrystalHover={onCrystalHover}>
                    {innerCrystalClones[0] && (
                        <Crystal 
                            object={innerCrystalClones[0]} 
                            position={[0, 3.15, 0]} 
                            route="/about"
                            onHover={onCrystalHover}
                            onClick={() => {}} // Will be overridden by AnimatedGroup
                        />
                    )}
                    {innerCrystalClones[1] && (
                        <Crystal 
                            object={innerCrystalClones[1]} 
                            position={[-1, 2.25, 0]} 
                            rotation={[0, 0, 0.6]} 
                            route="/works"
                            onHover={onCrystalHover}
                            onClick={() => {}} // Will be overridden by AnimatedGroup
                        />
                    )}
                    {outer_crystalClones[2] && (
                        <Crystal 
                            object={outer_crystalClones[2]} 
                            position={[-2.25, -1, 0]} 
                            rotation={[0, 0, 1.2]} 
                            onHover={onCrystalHover}
                            onClick={() => {}} // Will be overridden by AnimatedGroup
                        />
                    )}
                    {innerCrystalClones[3] && (
                        <Crystal 
                            object={innerCrystalClones[3]} 
                            position={[1, 2.25, 0]} 
                            rotation={[0, 0, -0.6]} 
                            route="/store"
                            onHover={onCrystalHover}
                            onClick={() => {}} // Will be overridden by AnimatedGroup
                        />
                    )}
                    {outer_crystalClones[4] && (
                        <Crystal 
                            object={outer_crystalClones[4]} 
                            position={[2.25, -1, 0]} 
                            rotation={[0, 0, -1.2]} 
                            onHover={onCrystalHover}
                            onClick={() => {}} // Will be overridden by AnimatedGroup
                        />
                    )}

                    <primitive object={broken_ring} scale={2.25} position={[0, -2, 0]} />
                </AnimatedGroup>

                <OrbitControls enabled={false}/>

                {/* Postprocessing */}
                <EffectComposer>
                    <SSAO
                        samples={16}
                        radius={0.1}
                        intensity={15}
                        luminanceInfluence={0.6}
                        color={new THREE.Color('#ffbc00')}
                    />
                    <Bloom
                        intensity={0.5}
                        luminanceThreshold={0.8}
                        luminanceSmoothing={0.2}
                    />
                    <Vignette eskil={false} offset={0.3} darkness={0.6} />
                </EffectComposer>
            </Canvas>
        </div>
    )
}

export default SceneCanvas;