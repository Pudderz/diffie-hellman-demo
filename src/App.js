import InputForm from "./components/InputForm";
import React, { useState } from "react";
import ShowDiffie from "./components/ShowDiffie";
function App() {
  const [variables, setVariables] = useState(false);
  const handleChange = (data) => {
    console.log("data is changing")
    setVariables(data);
  };
  return (
    <div className="App">
      <main>
        <InputForm changeData={handleChange} />
        <ShowDiffie data={variables} />
      </main>
    </div>
  );
}

export default App;
