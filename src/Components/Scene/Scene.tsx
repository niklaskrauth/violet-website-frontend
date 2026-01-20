import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SceneCanvas from "../SceneCanvas/SceneCanvas";
import SceneOverlay from "../SceneOverlay/SceneOverlay";
import SceneBackground from "../SceneBackground/SceneBackground";
import Home from "../../Pages/Home";
import About from "../../Pages/About";
import Store from "../../Pages/Store";
import Works from "../../Pages/Works";


const Scene = () => {
    const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

    return (
        <>
            <SceneBackground />
            <SceneCanvas onCrystalHover={setHoveredLabel} />
            
            {/* Hover Label Overlay */}
            <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center">
                <AnimatePresence>
                    {hoveredLabel && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="text-white text-6xl font-black tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                        >
                            {hoveredLabel}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-5">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/works" element={<Works />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            <SceneOverlay />
        </>
    )

}

export default Scene;