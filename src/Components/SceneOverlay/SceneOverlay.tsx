import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const SceneOverlay = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
            <motion.div 
                className="absolute top-8 right-8 pointer-events-auto cursor-pointer z-10"
                onClick={() => setIsOpen(!isOpen)}
                animate={{
                    x: isOpen ? -540 : 0, // Matches -translate-x-110 (110 * 4px = 440px)
                    scale: 1
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <img 
                    src={isOpen ? "/assets/images/BurgerMenu_rolled_out.png" : "/assets/images/BurgerMenu.png"}
                    alt="Menu" 
                    className="w-24 h-24"
                />
            </motion.div>

            {/* Menu Texts */}
            <div className="absolute top-15 right-32 flex flex-row-reverse items-center gap-8 pointer-events-none">
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, x: 32 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 32 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="pointer-events-auto"
                            >
                                <Link to="/store" onClick={() => setIsOpen(false)}>
                                    <span className="text-white text-2xl cursor-pointer hover:text-purple-400 drop-shadow-lg">STORE</span>
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 32 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 32 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="pointer-events-auto"
                            >
                                <Link to="/about" onClick={() => setIsOpen(false)}>
                                    <span className="text-white text-2xl cursor-pointer hover:text-purple-400 drop-shadow-lg">ABOUT</span>
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 32 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 32 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="pointer-events-auto"
                            >
                                <Link to="/works" onClick={() => setIsOpen(false)}>
                                    <span className="text-white text-2xl cursor-pointer hover:text-purple-400 drop-shadow-lg">WORKS</span>
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 32 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 32 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="pointer-events-auto"
                            >
                                <Link to="/" onClick={() => setIsOpen(false)}>
                                    <span className="text-white text-2xl cursor-pointer hover:text-purple-400 drop-shadow-lg">HOME</span>
                                </Link>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
    
}

export default SceneOverlay;