import { useRef } from "react";
import kNear from "./utils/knear";
import useClassification from "./hooks/use-classification";

export default function App() {
  const machine = useRef(new kNear(3));

  const { prediction, makePrediction } = useClassification({
    defaultValue: "",
    modelRef: machine,
  });

  return (
    <>
      <button onClick={makePrediction}>Make Prediction</button>
      <p>The prediction is {prediction}</p>
    </>
  );
}
