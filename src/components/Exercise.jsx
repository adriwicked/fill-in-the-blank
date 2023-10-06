import { useState } from "react";
import "./Exercise.css";

export default function Exercise({ sentence, onCorrectAnswer }) {
  if (!sentence) {
    return <p>Loading...</p>;
  }

  const sentenceChunks = parseSentence(sentence);
  const inputChunkObj = sentenceChunks.find((c) => c.isInput);
  const [validGuess, setValidGuess] = useState(null);
  const [guess, setGuess] = useState("");
  const [guessed, setGuessed] = useState(false);

  function parseSentence(sentence) {
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

  function handleGuess(e) {
    e.preventDefault();
    const isValid = guess === inputChunkObj.text;
    setValidGuess(isValid);
    setGuessed(true);
    if (isValid) {
      setGuess("");
      onCorrectAnswer();
    }
  }

  return (
    <>
      <form onSubmit={handleGuess} className="exerciseForm">
        <fieldset className="exercise">
          {sentenceChunks.map((chunk, i) => {
            return chunk.isInput ? (
              <input
                key={i}
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                className="guessInput"
              ></input>
            ) : (
              <p key={i}>{chunk.text}</p>
            );
          })}
        </fieldset>

        <input type="submit" value="guess" className="submitButton"></input>
      </form>
      {guessed && (validGuess ? <p>Correct!</p> : <p>Incorrect :(</p>)}
    </>
  );
}
