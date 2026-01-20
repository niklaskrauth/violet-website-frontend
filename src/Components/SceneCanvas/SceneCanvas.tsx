import { useMemo, useState, useRef } from "react";
import { OrbitControls} from "@react-three/drei";
import {Bloom, EffectComposer, SSAO, Vignette} from "@react-three/postprocessing";
import * as THREE from "three";
import {Canvas, useFrame} from "@react-three/fiber";
import { useGlbModelLoader} from "../../utils/modelLoader.ts";
import { useNavigate } from "react-router-dom";

const Crystal = ({ object, position, rotation, route, onHover }: { object: THREE.Object3D, position: [number, number, number], rotation?: [number, number, number], route?: string, onHover: (label: string | null) => void }) => {
    const navigate = useNavigate();
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
        const isHoverable = !!route;
        const targetScale = (hovered && isHoverable) ? 1.2 : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Smooth transition for position (upward movement)
        const targetY = (hovered && isHoverable) ? position[1] + 0.2 : position[1];
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    });

    return (
        <group
            ref={meshRef}
            position={position}
            rotation={rotation}
            onPointerOver={(e) => {
                if (!route) return;
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
            onClick={() => route && navigate(route)}
        >
            <primitive object={object} position={[0,0,0]} rotation={[0,0,0]} />
        </group>
    );
};

const SceneCanvas = ({ onCrystalHover }: { onCrystalHover: (label: string | null) => void }) => {

    const outer_crystal = useGlbModelLoader({ modelName: "outer-Crystal_a" });
    const broken_ring = useGlbModelLoader({ modelName: "Broken_ring" });
    const innerCrystal = useGlbModelLoader({ modelName: "inner_Crystal_a" });

    const outer_crystalClones = useMemo(() => {
        if (!outer_crystal) return [];
        return Array.from({ length: 5 }, () => {
            const clone = outer_crystal.clone();
            return clone;
        });
    }, [outer_crystal]);

    const innerCrystalClones = useMemo(() => {
        if (!innerCrystal) return [];
        return Array.from({ length: 5 }, () => {
            const clone = innerCrystal.clone();
            return clone;
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


                <group
                    position={[0, -2.5, 0]}
                    scale={[1,1,1]}
                >

                    {innerCrystalClones[0] && (
                        <Crystal 
                            object={innerCrystalClones[0]} 
                            position={[0, 3.15, 0]} 
                            route="/works" 
                            onHover={onCrystalHover}
                        />
                    )}
                    {innerCrystalClones[1] && (
                        <Crystal 
                            object={innerCrystalClones[1]} 
                            position={[-1, 2.25, 0]} 
                            rotation={[0, 0, 0.6]} 
                            route="/store" 
                            onHover={onCrystalHover}
                        />
                    )}
                    {outer_crystalClones[2] && (
                        <Crystal 
                            object={outer_crystalClones[2]} 
                            position={[-2.25, -1, 0]} 
                            rotation={[0, 0, 1.2]} 
                            onHover={onCrystalHover}
                        />
                    )}
                    {innerCrystalClones[3] && (
                        <Crystal 
                            object={innerCrystalClones[3]} 
                            position={[1, 2.25, 0]} 
                            rotation={[0, 0, -0.6]} 
                            route="/about" 
                            onHover={onCrystalHover}
                        />
                    )}
                    {outer_crystalClones[4] && (
                        <Crystal 
                            object={outer_crystalClones[4]} 
                            position={[2.25, -1, 0]} 
                            rotation={[0, 0, -1.2]} 
                            onHover={onCrystalHover}
                        />
                    )}

                    <primitive object={broken_ring} scale={2.25} position={[0, -2, 0]} />
                </group>

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