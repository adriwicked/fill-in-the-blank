import "./App.css";
import Exercise from "./components/Exercise";

function App() {
  const sentence = "Steve is ill. [He is] in bed.";
  return (
    <>
      <h1 className="title">
        fill in the <span className="blank">blank</span>
      </h1>
      <Exercise sentence={sentence} />
    </>
  );
}

export default App;
