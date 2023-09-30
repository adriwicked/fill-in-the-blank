import { useState } from "react";

export default function Exercise({ sentence }) {
  const sentenceChunks = parseSentence(sentence);
  const [validGuess, setValidGuess] = useState(false);

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

    setValidGuess(true);
  }

  return (
    <>
      <form onSubmit={handleGuess}>
        {sentenceChunks.map((chunk, i) => {
          // prettier-ignore
          return chunk.isInput
            ? <input key={i}></input>
            : <p key={i}>{chunk.text}</p>
        })}

        <input type="submit" value="guess"></input>
      </form>
      {}
      {validGuess && <p>Correct!</p>}
    </>
  );
}
