// import kNear from "@/utils/knear";
// import { RefObject, useEffect, useState } from "react";

// function useClassification(props: {
//   defaultValue: string;
//   modelRef: RefObject<kNear>;
// }) {
//   const [prediction, setPrediction] = useState(props.defaultValue);

//   useEffect(() => {
//     props.modelRef.current.learn([1, 2, 3], "cat");
//     props.modelRef.current.learn([0, 0, 0], "cat");
//     props.modelRef.current.learn([14, 10, 9], "dog");
//     props.modelRef.current.learn([9, 12, 13], "dog");
//   }, [props.modelRef]);
//   const makePrediction = () => {
//     const result = props.modelRef.current.classify([3, 5, 4]);
//     setPrediction(result);
//   };

//   return { prediction, makePrediction };
// }

// export default useClassification;
