import "./App.css";
import Exercise from "./components/Exercise";

function App() {
  const sentence = "Steve is ill. [He is] in bed.";
  return (
    <>
      <h1>fill in the blank</h1>
      <Exercise sentence={sentence} />
    </>
  );
}

export default App;
