function getTestingData() {
  // haal deze data uit localstorage
  if (Storage === undefined) {
    throw new Error("Localstorage is not supported");
    return;
  }
  const trainingData = localStorage.getItem("testingData");
  if (trainingData === null) {
    throw new Error("No 'testingData' key found");
    return;
  }

  // convert string to object
  return JSON.parse(trainingData).data;
}

export { getTestingData };
