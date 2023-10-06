import { useState } from "react";
import "./Exercise.css";

export default function Exercise({ sentence }) {
  const sentenceChunks = sentence ? parseSentence(sentence) : [];
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

    setValidGuess(guess === inputChunkObj.text);
    setGuessed(true);
  }

  return (
    <>
      <form onSubmit={handleGuess} className="exerciseForm">
        <fieldset className="exercise">
          {sentenceChunks.length > 0 ? (
            sentenceChunks.map((chunk, i) => {
              return chunk.isInput ? (
                <input
                  key={i}
                  onChange={(e) => setGuess(e.target.value)}
                  className="guessInput"
                ></input>
              ) : (
                <p key={i}>{chunk.text}</p>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </fieldset>

        <input type="submit" value="guess" className="submitButton"></input>
      </form>
      {guessed && (validGuess ? <p>Correct!</p> : <p>Incorrect :(</p>)}
    </>
  );
}
