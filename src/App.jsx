import { useState, useEffect } from "react";
import Exercise from "./components/Exercise";
import { getSentences } from "./services/sentences";
import "./App.css";

export default function App() {
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
