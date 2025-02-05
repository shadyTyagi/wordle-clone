import { useState, useEffect } from "react";
import "./App.css";
import WordLine from "./components/WordLine";

const WORD_LENGTH = 5;
const TOTAL_GUESSES = 6;
const words = ["apple", "grape", "table", "chair", "beach"];

function App() {
  const [guessedWords, setGuessedWords] = useState(
    new Array(TOTAL_GUESSES).fill("     ")
  );
  const [correctWord, setCorrectWord] = useState("");
  const [correctLetterObject, setCorrectLetterObject] = useState({});
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [currentWord, setCurrentWord] = useState("     ");
  const [gameOver, setGameOver] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [gameStatus, setGameStatus] = useState("playing");

  function fetchWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    console.log(word);
    const letterObject = {};
    for (let letter of word) {
      letterObject[letter] = (letterObject[letter] || 0) + 1;
    }
    setCorrectWord(word);
    setCorrectLetterObject(letterObject);
  }

  // Getting Correct Word
  useEffect(() => {
    fetchWord();
  }, []);

  function handleEnter() {
    if (currentWord === correctWord) {
      setGameOver(true);
      setGameStatus("won");
      return;
    }

    if (currentWord !== correctWord && wordCount === TOTAL_GUESSES - 1) {
      setGameOver(true);
      return;
    }

    if (letterCount !== WORD_LENGTH) {
      alert("Words must be five letters.");
      return;
    }

    setGuessedWords((current) => {
      const updatedGuessedWords = [...current];
      updatedGuessedWords[wordCount] = currentWord;
      return updatedGuessedWords;
    });

    setWordCount((current) => current + 1);
    setLetterCount(0);
    setCurrentWord("     ");
  }

  function handleBackspace() {
    if (letterCount === 0) {
      return;
    }

    setCurrentWord((currentWord) => {
      const currentWordArray = currentWord.split("");
      currentWordArray[letterCount - 1] = " ";
      const newWord = currentWordArray.join("");
      return newWord;
    });

    setLetterCount((currentCount) => currentCount - 1);
  }

  function handleAlphabetical(key) {
    if (letterCount === WORD_LENGTH) {
      return;
    }

    setCurrentWord((currentWord) => {
      const currentWordArray = currentWord.split("");
      currentWordArray[letterCount] = key;
      const newWord = currentWordArray.join("");
      return newWord;
    });

    setLetterCount((currentCount) => currentCount + 1);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Enter") {
        handleEnter();
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleAlphabetical(e.key);
      } else {
        return;
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    if (gameOver) {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleEnter, handleBackspace, handleAlphabetical, gameOver]);

  function resetGame() {
    setGuessedWords(new Array(TOTAL_GUESSES).fill("     "));
    fetchWord();
    setWordCount(0);
    setLetterCount(0);
    setCurrentWord("     ");
    setGameOver(false);
    setGameStatus("playing");
  }

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded text-sm sm:text-base ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <span
        className={`text-4xl sm:text-6xl md:text-8xl font-extrabold mb-4 sm:mb-8 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        WORDLE!
      </span>

      {/* Word Lines */}
      <div className="flex flex-col space-y-2 sm:space-y-4">
        {guessedWords.map((word, index) => {
          if (index === wordCount) {
            return (
              <WordLine
                word={currentWord}
                correctWord={correctWord}
                correctLetterObject={correctLetterObject}
                revealed={false || gameOver}
                isDarkMode={isDarkMode}
                key={index}
              />
            );
          }
          return (
            <WordLine
              word={word}
              correctWord={correctWord}
              correctLetterObject={correctLetterObject}
              revealed={true}
              isDarkMode={isDarkMode}
              key={index}
            />
          );
        })}
      </div>

      {/* Game Status and Reset Button */}
      {gameStatus === "playing" ? (
        <button
          className={`m-4 p-2 sm:p-4 border-2 text-lg sm:text-2xl font-semibold rounded transition-colors duration-300 ${
            isDarkMode
              ? "border-white hover:bg-gray-700 text-white"
              : "border-black hover:bg-gray-200 text-black"
          }`}
          onClick={(e) => {
            resetGame();
            e.target.blur();
          }}
        >
          Reset Game
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className={`m-4 p-2 sm:p-4 border-2 text-lg sm:text-2xl font-semibold rounded transition-colors duration-300 ${
              isDarkMode
                ? "border-white hover:bg-gray-700 text-white"
                : "border-black hover:bg-gray-200 text-black"
            }`}
            onClick={(e) => {
              resetGame();
              e.target.blur();
            }}
          >
            Reset Game
          </button>
          <span className="text-xl sm:text-2xl font-bold">
            {gameStatus === "won" ? "🎉 You Won!" : "❌ You Lost!"}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
