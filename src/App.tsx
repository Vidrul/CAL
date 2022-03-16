import { useEffect, useState } from "react";
import Button from "./common/Button";

const btnValues = [
  ["Ac", "C", "%", "/"],
  [7, 8, 9, "*"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [".", 0, "="],
];

function App() {
  const [state, setState] = useState("");
  const [length, setLength] = useState(0);
  const [result, setRes] = useState("");
  const [theme, setTheme] = useState(false);

  const handleChange = () => {
    setTheme((prevState) => !prevState);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const sign = e.currentTarget.innerHTML.toString();
    setRes("");

    if (
      state === "" &&
      (sign === "+" ||
        sign === "-" ||
        sign === "/" ||
        sign === "*" ||
        sign === "%")
    ) {
      return;
    }

    if (
      (sign === "+" ||
        sign === "-" ||
        sign === "/" ||
        sign === "*" ||
        sign === "%") &&
      (state.slice(-1) === "+" ||
        state.slice(-1) === "-" ||
        state.slice(-1) === "/" ||
        state.slice(-1) === "*" ||
        state.slice(-1) === "%")
    ) {
      return;
    }

    if (
      sign === "+" ||
      sign === "-" ||
      sign === "/" ||
      sign === "*" ||
      sign === "%"
    ) {
      setState(state.concat(e.currentTarget.innerHTML));
      setLength(0);
    }

    if (length === 15) {
      return;
    }

    setLength(length + 1);
    setState(state.concat(e.currentTarget.innerHTML));
  };

  const allClear = () => {
    setState("");
    setRes("");
    setLength(0);
  };

  const back = () => {
    setState((prevState) => prevState.slice(0, -1));
    if (length !== 0) {
      setLength(length - 1);
    }
  };

  const calculate = () => {
    if (
      state.slice(-1) === "+" ||
      state.slice(-1) === "-" ||
      state.slice(-1) === "/" ||
      state.slice(-1) === "*" ||
      state.slice(-1) === "%"
    ) {
      return setRes(Number(eval(state.slice(0, -1)).toString()).toFixed(2));
    }
    setRes(Number(eval(state).toString()).toFixed(2));
    setLength(0);
    setState("");
  };

  useEffect(() => {
    if (
      state.slice(-1) === "+" ||
      state.slice(-1) === "-" ||
      state.slice(-1) === "/" ||
      state.slice(-1) === "*" ||
      state.slice(-1) === "%"
    ) {
      setLength(0);
    }
  }, [state]);

  useEffect(() => {
    if (theme) {
      document.querySelector(".wrapper")?.classList.add("white_theme");
    } else {
      document.querySelector(".wrapper")?.classList.remove("white_theme");
    }
  }, [theme]);

  return (
    <div className="App">
      <label className="swith">
        <input type="checkbox" onChange={handleChange} />
        <span className="slider"></span>
      </label>

      <div className="wrapper">
        <div className="display">
          <div
            className={
              "display__content " + (state.length > 10 ? "display_text_m" : "")
            }
          >
            <p>{result ? result : state}</p>
          </div>
        </div>
        <div className="actions">
          {btnValues.flat().map((v) => (
            <Button
              key={v}
              className={"btn " + (v === "=" ? "equals" : "")}
              value={v}
              onClick={
                v === "Ac"
                  ? allClear
                  : v === "="
                  ? calculate
                  : v === "C"
                  ? back
                  : handleClick
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
