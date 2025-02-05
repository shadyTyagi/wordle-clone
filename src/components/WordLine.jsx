import LetterBox from "./LetterBox";

function WordLine({
  word,
  correctWord,
  correctLetterObject,
  revealed,
  isDarkMode,
}) {
  return (
    <div className="flex flex-row space-x-2 m-4">
      {word.split("").map((letter, index) => {
        const hasCorrectLocation = letter === correctWord[index];
        const hasCorrectLetter = letter in correctLetterObject;

        return (
          <LetterBox
            letter={letter}
            green={hasCorrectLocation && hasCorrectLetter && revealed}
            yellow={!hasCorrectLocation && hasCorrectLetter && revealed}
            grey={!hasCorrectLocation && !hasCorrectLetter && revealed}
            key={index}
            isDarkMode={isDarkMode}
          />
        );
      })}
    </div>
  );
}

export default WordLine;
