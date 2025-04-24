import { CSSProperties, useState } from "react";
import "./index.css";
import { getData } from "./loadData";
import { ClassificationResult } from "./types";

export default function App() {
  const [accuracy, setAccuracy] = useState(0);
  const [testDataLength, settestDataLength] = useState(0);
  const [correctPredictionsState, setCorrectPredictionsState] = useState(0);

  // @ts-expect-error - no types available
  ml5.setBackend("webgl");
  // @ts-expect-error - no types available
  const nn = ml5.neuralNetwork({ task: "classification", debug: true });

  // model laden
  const modelDetails = {
    model: "../models/model.json",
    metadata: "../models/model_meta.json",
    weights: "../models/model.weights.bin",
  };

  nn.load(modelDetails, modelLoaded);
  async function modelLoaded() {
    const testingData = getData();
    settestDataLength(testingData.length);

    // console.log("testingData", testingData);

    // houd bij hoeveel voorspellingen correct zijn
    let correctPredictions = 0;

    // Loop over de test data en voorspel de labels
    for (const testCase of testingData) {
      const [topSpellingLabel] = (await nn.classify(
        testCase.vector
      )) as ClassificationResult;

      // const correctAnswer = testCase.label;
      // console.log( `Ik voorspelde: ${topSpellingLabel.label}. Het correcte antwoord is: ${testCase.label}`);

      if (topSpellingLabel.label === testCase.label) {
        correctPredictions++;
      }
    }

    // Bereken de accuracy door het aantal correcte voorspellingen te delen door het aantal testdata
    const modelAccuracy = (correctPredictions / testingData.length) * 100;

    setCorrectPredictionsState(correctPredictions);
    setAccuracy(modelAccuracy);
    // console.log(`Accuracy: ${modelAccuracy}%`);
  }

  const bgColor: CSSProperties = { backgroundColor: "lightgreen" };
  return (
    <>
      <h1>ML Testing</h1>
      <p>
        Berekent de accuracy door het aantal correcte voorspellingen te delen
        door het totaal aantal poses.
      </p>

      <table>
        <tr>
          <td>Testdata</td>
          <td>{testDataLength}</td>
        </tr>
        <tr>
          <td>Correct voorspeld</td>
          <td>{correctPredictionsState}</td>
        </tr>
        <tr>
          <td>
            <b>Accuracy</b>
          </td>
          <td>
            {correctPredictionsState}/{testDataLength}=
            {correctPredictionsState / testDataLength}
            {/* {accuracy} */}
          </td>
          <td style={bgColor}>({accuracy}%)</td>
        </tr>
      </table>
    </>
  );
}
