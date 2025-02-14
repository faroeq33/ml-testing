// import "./index.css";
// import { getTestingData } from "./getData";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./app.tsx";
import { loadKNNModel } from "./loadModel.ts";

loadKNNModel();

/*
async function modelLoaded(nn: { classify: () => void }) {
  const testingData = getTestingData();
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
  */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
