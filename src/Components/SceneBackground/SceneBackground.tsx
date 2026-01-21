
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const SceneBackground = () => {
    const location = useLocation();
    const isAboutPage = location.pathname === "/about";

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            {/* Main Background Image */}
            <img 
                src="/assets/images/Background_main.png"
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Spinning Circle Image */}
            <div className="absolute top-0 left-18 w-[100vmax] h-[100vmax] -translate-x-1/2 -translate-y-1/2">
                <motion.img 
                    src="/assets/images/Background_Circle.png"
                    alt="Background Circle" 
                    className="w-full h-full object-contain"
                    animate={{ rotate: 360 }}
                    transition={{ 
                        duration: 60, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                />
            </div>

            <AnimatePresence>
                {isAboutPage && (
                    <>
                        {/* Person Background */}
                        <motion.img
                            key="background-person"
                            src="/assets/images/Background_person.png"
                            alt="Background Person"
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                        />
                        {/* Hand Background */}
                        <motion.img
                            key="background-hand"
                            src="/assets/images/Background_Hand.png"
                            alt="Background Hand"
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1, x: -20, y: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, scale: 1.1, x: -20, y: 20 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SceneBackground;
