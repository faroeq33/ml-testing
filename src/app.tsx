import "./index.css";
import { getData } from "./loadData";
// import { useEffect, useRef } from "react";
// import kNear from "./utils/knear";
// import useClassification from "./hooks/use-nn-classification";

// const getData = () => {
//   async function getTestingData() {
//     try {
//       const response = await fetch("data/poses-14-2-2025@13h2m13s.json", {
//         headers: {
//           accept: "application/json",
//           "User-agent": "testing app",
//         },
//       });
//       const result = await response.json();
//       console.log(result);
//       return result;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
//   getTestingData();
// };
export default function App() {
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
    console.log("testingData", testingData);

    // houd bij hoeveel voorspellingen correct zijn
    let correctPredictions = 0;

    // Loop over de test data en voorspel de labels
    for (const d of testingData) {
      const result = await nn.classify(d.vector);
      const { label: topSpellingLabel } = result[0];
      const { label: correctAnswer } = d;
      console.log(
        `Ik voorspelde: ${topSpellingLabel}. Het correcte antwoord is: ${correctAnswer}`
      );
      if (topSpellingLabel === correctAnswer) {
        correctPredictions++;
      }
    }

    // Bereken de accuracy door het aantal correcte voorspellingen te delen door het aantal test data
    const accuracy = (correctPredictions / testingData.length) * 100;

    console.log(`Accuracy: ${accuracy}%`);

    const element = document.createElement("div");
    element.innerHTML = `Accuracy: ${accuracy}%`;
  }

  document.querySelector<HTMLDivElement>(
    "#app"
  )!.innerHTML = `<h1>ML Testing</h1>`;

  return (
    <>
      {/* <button onClick={makePrediction}>Make Prediction</button> */}
      {/* <p>The prediction is {prediction}</p> */}
    </>
  );
}
