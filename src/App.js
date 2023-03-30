import React, { useState } from "react";
import * as math from "mathjs";
import './App.css';
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
    ["C", "Ans", "%", "÷"],
    [7, 8, 9, "×"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
];

const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1,");

const formatExpr = (expr) => expr.replace(/×/g, "*").replace(/÷/g, "/");


function App() {
    let [calc, setCalc] = useState({
        expr: "",
        res: 0
    });

    const clickHandler = (e) => {
        e.preventDefault();
        const value = e.target.textContent;
        let newExpr = calc.expr + value;
        console.log(`value: ${value} current expr: ${calc.expr} new expr: ${newExpr}`);

        setCalc({
                ...calc,
                expr: newExpr,
                res: calc.res
                });
    }

    const equalsClickHandler = () => {
        setCalc({
                ...calc,
                expr: calc.expr,
                res: math.evaluate(formatExpr(calc.expr))
            });
    }

    const ansClickHandler = () => {
        setCalc({
            ...calc,
            expr: calc.res,
            res: 0
        });
    }

    const resetClickHandler = () => {
        setCalc({
            ...calc,
            expr: "",
            res: 0,
        });
    }

    return (
        <div className="App">
            <Wrapper>
                <Screen value1={calc.expr} value2={calc.res !== 0 ? toLocaleString(calc.res) : " "}/>
                <ButtonBox>
                    {btnValues.flat().map((btn, i) => {
                        return (
                            <Button
                                key={i}
                                className={btn === "=" ? "equals" : ""}
                                value={btn}
                                onClick={
                                    btn === "C"
                                        ? resetClickHandler
                                        : btn === "Ans"
                                        ? ansClickHandler
                                        : btn === "="
                                        ? equalsClickHandler
                                        : clickHandler
                                }
                            />
                        );
                    })}
      </ButtonBox>
            </Wrapper>
        </div>
    );
}

export default App;
