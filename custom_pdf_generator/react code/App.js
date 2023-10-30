import React, { useState } from "react";
import Step1 from "./component/Step1";
import Step2 from "./component/Step2";
import Step3 from "./component/Step3";
import Step4 from "./component/Step4";

function App() {
  const [step, setStep] = useState(1);
  const [arr, setArr] = useState([]);

  console.log(arr);

  const handleSubmit = (data) => {
    setArr([...arr, data]); // Append form data to the array.
    if (step < 4) {
      setStep(step + 1); // Transition to the next step
    }
  };

  return (
    <div>
      {step === 1 && <Step1 onSubmit={handleSubmit} />}
      {step === 2 && <Step2 onSubmit={handleSubmit} />}
      {step === 3 && <Step3 onSubmit={handleSubmit} />}
      {step === 4 && <Step4 data={arr} array = {arr} />}
    </div>
  );
}

export default App;
