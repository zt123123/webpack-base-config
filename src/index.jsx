import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return <h1>Hello World!!!</h1>;
};

(async() => {
  const a = await new Promise(resolve => resolve(123));
  console.log(a);
})()

ReactDOM.render(<App />, document.getElementById("app"));
