import { useState } from "react";
import "./App.css";

function App() {
  const [counts, setCounts] = useState(0);
  const [result, setResult] = useState("");

  function applyExpression(countedNumber) {
    setCounts(countedNumber);
    setResult(eval(counts));
  }

  function clearInputs() {
    setCounts(0);
    setResult("");
  }

  function Numbers(props) {
    const nums = Array.from(Array(10).keys()).map((number) => {
      return (
        <button
          onClick={(e) => {
            if (props.data != "0") props.onClick(props.data + e.target.innerHTML);
            else props.onClick(e.target.innerHTML);
          }}
          key={number}
        >
          {number}
        </button>
      );
    });
    return nums;
  }

  function CountButton(props) {
    const expressions = /\+|\-|\/|\*| /;
    const lastNumber = props.data[props.data.length - 1];

    function checkExpressionType() {
      if (expressions.test(lastNumber)) return;
      props.onClick(props.data + props.expression);
    }

    return (
      <button
        onClick={() => {
          checkExpressionType();
        }}
      >
        {props.expression}
      </button>
    );
  }

  return (
    <>
      <div className="main--container">
        <div className="input--container">
          <p className="input--line">{counts}</p>
          <p className="result--line">{"=" + result}</p>
        </div>
        <div className="button--container">
          <div className="numbers--container">
            <Numbers data={counts} onClick={setCounts} />
            <button className="clear--button" onClick={clearInputs}>
              AC
            </button>
          </div>
          <div className="expressin--container">
            <CountButton data={counts} expression={"+"} onClick={applyExpression} />
            <CountButton data={counts} expression={"-"} onClick={applyExpression} />
            <CountButton data={counts} expression={"*"} onClick={applyExpression} />
            <CountButton data={counts} expression={"/"} onClick={applyExpression} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
