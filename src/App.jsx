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
        className="expression--button"
        onClick={() => {
          checkExpressionType();
        }}
      >
        {props.expression}
      </button>
    );
  }

  function InputCalc(props) {
    const [result, setResult] = useState("");
    const [counts, setCounts] = useState("");

    function updateCounts(e) {
      const expressions = /[0-9]|\)/;
      const lastNumber = e.target.value[e.target.value.length - 2];

      if (!expressions.test(lastNumber) && !expressions.test(e.nativeEvent.data) && e.nativeEvent.data != null) return;
      if (expressions.test(e.nativeEvent.data)) setResult(eval(e.target.value));
      setCounts(e.target.value);

      if (!expressions.test(lastNumber)) return;
      else setResult(eval(e.target.value));
    }

    return (
      <div className="line--container">
        <input
          type="text"
          value={counts}
          onChange={(e) => {
            updateCounts(e);
          }}
        />
        <p>{result}</p>
      </div>
    );
  }

  return (
    <>
      <div className="main--container">
        <div className="input--container">
          <InputCalc />
          <div className="input--container--old">
            <p className="input--line">{counts}</p>
            <p className="result--line">{"=" + result}</p>
          </div>
        </div>
        <div className="button--container">
          <div className="numbers--container">
            <Numbers data={counts} onClick={setCounts} />
            <button className="clear--button" onClick={clearInputs}>
              AC
            </button>
          </div>
          <div className="expression--container">
            <CountButton data={counts} expression={"+"} onClick={applyExpression} />
            <CountButton data={counts} expression={"-"} onClick={applyExpression} />
            <CountButton data={counts} expression={"*"} onClick={applyExpression} />
            <CountButton data={counts} expression={"/"} onClick={applyExpression} />
          </div>
          <button className="result--button" onClick={() => setResult(eval(counts))}>
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
