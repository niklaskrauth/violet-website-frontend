
import { motion } from "framer-motion";

const SceneBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            {/* Main Background Image */}
            <img 
                src="/assets/images/Background_main.png"
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Spinning Circle Image */}
            <div className="absolute top-0 left-0 w-[100vmax] h-[100vmax] -translate-x-1/2 -translate-y-1/2">
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
        </div>
    );
};

export default SceneBackground;
