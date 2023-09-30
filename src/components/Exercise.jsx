import { useState } from "react";

export default function Exercise({ sentence }) {
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

    setValidGuess(guess === inputChunkObj.text);
    setGuessed(true);
  }

  return (
    <>
      <form onSubmit={handleGuess}>
        {sentenceChunks.map((chunk, i) => {
          // prettier-ignore
          return chunk.isInput
            ? <input key={i} onChange={e => setGuess(e.target.value)}></input>
            : <p key={i}>{chunk.text}</p>
        })}

        <input type="submit" value="guess"></input>
      </form>
      {guessed && (validGuess ? <p>Correct!</p> : <p>Incorrect :(</p>)}
    </>
  );
}
