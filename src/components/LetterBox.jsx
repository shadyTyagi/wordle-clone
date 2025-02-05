function LetterBox({ letter, green, yellow, isDarkMode, grey }) {
  return (
    <div
      className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border-2 sm:border-3 md:border-4 border-black text-black text-2xl sm:text-3xl md:text-4xl lg:text-6xl flex items-center justify-center transition-colors duration-200 
        ${
          green
            ? `${isDarkMode ? "bg-green-700" : "bg-green-500"} animate-bounce`
            : yellow
            ? `${isDarkMode ? "bg-yellow-700" : "bg-yellow-500"} animate-pulse`
            : grey
            ? `${isDarkMode ? "bg-gray-700" : "bg-gray-500"}`
            : "bg-white"
        }`}
    >
      {letter}
    </div>
  );
}

export default LetterBox;
