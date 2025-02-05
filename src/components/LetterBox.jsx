import { motion } from "framer-motion";

function LetterBox({ letter, green, yellow, isDarkMode, grey }) {
  // Define different animations for each feedback type
  const animations = green
    ? { scale: [1, 1.2, 1], transition: { duration: 0.3, ease: "easeInOut" } } // Bounce effect
    : yellow
    ? { x: [-5, 5, -5, 5, 0], transition: { duration: 0.4, ease: "easeInOut" } } // Shake effect
    : grey
    ? { opacity: [0, 1], scale: [1.1, 1], transition: { duration: 0.3 } } // Fade In with slight scale down
    : {};

  return (
    <motion.div
      className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border-2 sm:border-3 md:border-4 border-black text-black text-2xl sm:text-3xl md:text-4xl lg:text-6xl flex items-center justify-center transition-colors duration-200
        ${
          green
            ? `${isDarkMode ? "bg-green-700" : "bg-green-500"}`
            : yellow
            ? `${isDarkMode ? "bg-yellow-700" : "bg-yellow-500"}`
            : grey
            ? `${isDarkMode ? "bg-gray-700" : "bg-gray-500"}`
            : "bg-white"
        }`}
      initial={{ scale: 1 }}
      animate={animations}
    >
      {letter}
    </motion.div>
  );
}

export default LetterBox;
