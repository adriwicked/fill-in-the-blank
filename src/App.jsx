import { useState, useEffect } from "react";
import Exercise from "./components/Exercise";
import "./App.css";

async function getSentences() {
  return Promise.resolve([
    "Steve is ill. [He is] in bed.",
    "I'm not hungry, but [I am] thirsty.",
    "Mr Thomas is a very old man. [He is] 98.",
    "These chairs aren't beautiful, but [they are] comfortable.",
    "The weather is nice today. [It is] warm and sunny.",
  ]);
}

function App() {
  const [sentences, setSentences] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    getSentences().then(setSentences);
  }, []);

  function setNextSentence() {
    setIdx(idx + 1);
  }

  return (
    <>
      <h1 className="title">
        fill in the <span className="blank">blank</span>
      </h1>
      <Exercise sentence={sentences[idx]} onCorrectAnswer={setNextSentence} />
    </>
  );
}

export default App;
