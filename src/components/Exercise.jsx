import { useEffect, useRef, useState } from "react";
import "./Exercise.css";

export default function Exercise({ sentence, onCorrectAnswer }) {
  const [chunks, setChunks] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [guessed, setGuessed] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const inputsRefs = useRef([]);

  useEffect(() => {
    setChunks(parseSentence(sentence));
  }, [sentence]);

  function parseSentence(sentence) {
    if (!sentence) {
      return [];
    }
    const re = /(\[[^\]]*\])/;
    const chunks = sentence.split(re);

    const sentenceParts = chunks.map((chunk) => {
      const isInput = re.test(chunk);

      return {
        guess: "",
        isInput,
        text: isInput ? chunk.slice(1, -1) : chunk,
      };
    });

    return sentenceParts;
  }

  function updateGuesses(idx, guess) {
    const newChunks = chunks.map((c, i) => {
      return i === idx ? Object.assign({}, c, { guess }) : c;
    });
    setChunks(newChunks);
  }

  function handleGuess(e) {
    e.preventDefault();

    const guessesAreValid = chunks
      .filter((c) => c.isInput)
      .every((c) => c.guess.toLowerCase() === c.text.toLowerCase());

    setIsCorrect(guessesAreValid);
    setGuessed(true);

    if (guessesAreValid) {
      onCorrectAnswer();
      inputsRefs.current[0].focus();
    }
  }

  function setFocusOnSaveRef(ref) {
    inputsRefs.current.push(ref);
    if (firstRender) {
      inputsRefs.current[0].focus();
      setFirstRender(false);
    }
  }

  if (!sentence) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={handleGuess} className="exerciseForm">
        <fieldset className="exercise">
          {chunks.map((chunk, i) => {
            return chunk.isInput ? (
              <input
                key={i}
                ref={setFocusOnSaveRef}
                value={chunk.guess}
                onChange={(e) => updateGuesses(i, e.target.value)}
                className="guessInput"
              ></input>
            ) : (
              <p key={i}>{chunk.text}</p>
            );
          })}
        </fieldset>
        {guessed && (
          <div className="circle">
            {isCorrect ? (
              <i
                className="fa-solid fa-check"
                role="img"
                aria-label="correct"
              ></i>
            ) : (
              <i
                className="fa-solid fa-x"
                role="img"
                aria-label="incorrect"
              ></i>
            )}
          </div>
        )}
        <input type="submit" value="guess" className="submitButton" />
      </form>
    </>
  );
}
