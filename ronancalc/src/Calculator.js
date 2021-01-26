import './Calculator.css';
import './App.css';
import './DataPanel.css';
import React, { useEffect, useState } from 'react';
import useGlobal from './useGlobal';
import { calcToSymbols, getSymbols } from './DataPanel.js';

function Button(props) {
    const value = props.value;
    const radix = props.radix;
    const minWidth = 70 / Math.ceil(Math.sqrt(radix)) + "%";
    return (
        <button
            className="numberButton"
            style={{minWidth: minWidth, fontSize: "4vmin"}}
            onClick={props.handleClick}
        >
            {value}
        </button>
    );
}
 
function calculate(ops) {
    let runningTotal = 0;
    let lastSign = "+";
    for (let i = 0; i < ops.length; i++) {
        let value = ops[i];
        console.log(value, runningTotal)
        //check if NaN
        if (isNaN(parseFloat(value))) {
            lastSign = value;
        } else {
            value = parseFloat(ops[i]);
            if (lastSign === "/") {
                runningTotal = runningTotal / value;
            } else if (lastSign === "*") {
                runningTotal = runningTotal * value;
            } else if (lastSign === "-") {
                runningTotal = runningTotal - value;
            } else if (lastSign === "+") {
                runningTotal = runningTotal + value;
            }
        }
        //perform previous operation with current value and running total
    }
    return runningTotal.toString();
}

function numberPress(text, base, number) {
    //make a copy of the text
    let line = text.slice(0);
    //split copy and check last value
    let hunks = line.split(" ");
    let last = hunks.pop();
    //if last value is NaN then return text + number
    if (isNaN(parseFloat(last))) {
        return (text + number.toString())
    }
    //else last value is number
    //remove it from the text
    let newLine = line.substring(0, line.length - last.length);
    //parse it into a number, multiply it by the base and add number
    let lastNumber = (parseFloat(last) * base) + number;
    //place it back onto the text and return it
    return (newLine + lastNumber.toString());
}
function alterCalc(text, base) {
    let radixText = "";
    //store a split on text
    let chunks = text.split(" ");
    //go through characters and check each for isNaN
    chunks.forEach(chunk => {
        //if isNaN, push onto returnText
        if (isNaN(parseFloat(chunk))) {
            radixText += " " + chunk + " ";
        } else {
            //else parseFloat(Chars).toString(base) and push onto returnText 
            radixText += parseFloat(chunk).toString(base);
        }
    });
    //return alteredCalc
    return radixText
}

function getDisplay(texts, radix, arabic = false) {
    let displays = texts.map((text, index) => {
        let visibleRune = arabic ? alterCalc(text, radix) : calcToSymbols(alterCalc(text, radix), radix, "orange");
        let box = 
        <div key={"display:" + index} className="displayRow">
            {visibleRune}
        </div>;
        return box
    });
    return displays
}
//migrate inner functions to outside
export default function Calculator() {
    const [display, setDisplay] = useState(["5 + 5 = ", "10"]);
    const [radix] = useGlobal(4, "radix");
    const [arabic] = useGlobal(true, "arabic");

    useEffect(() => {
        let view = document.getElementById("display");
        view.scrollTop = view.scrollHeight;
    });

    // add operations next
    let signs = [ " / ", " * ", " - ", " + " ];
    let operations = signs.map(op => {
        //default operation buttons
        return <Button
            key={op}
            value={op}
            handleClick={() => {
                let list = display.slice(0);
                list[list.length - 1] += op;
                setDisplay(list)
            }}
        />
    });
    //Calculation button( yah know the big selling point)
    operations.push(
        <Button
            key={" ="}
            value={" ="}
            handleClick={() => {
                let list = display.slice(0);
                let last = list.pop();
                let total = calculate(last.split(" "));
                last += " = " + total;
                list.push(last);
                list.push(total);
                setDisplay(list);
            }}
        />
    );
    //the clear line button
    operations.push(
        <Button
            key={"c"}
            value={"c"}
            handleClick={() => {
                let list = display.slice(0);
                let last = list.pop();
                last += " c";
                list.push(last);
                list.push("0");
                setDisplay(list);
            }}
        />
    );

    //numbers
    let numbers = [];
    for (let i = 1; i < radix; i++) {
        numbers.push(i.toString(radix));
    }
    numbers.push(0);
    let buttons = numbers.map(number => {
        return <Button
            value={arabic ? number : getSymbols(number, radix, "orange")}
            radix={radix}
            key={"#" + number}
            handleClick={() => {
                let list = display.slice(0);
                // console.log(list);
                let currentDisplay = list.pop();
                let last = numberPress(currentDisplay, radix, parseInt(number, radix));
                list.push(last);
                setDisplay(list);
            }}
        />
    });
    return (
        <div className="calculator" key="parent">
            <div id="display" className="display" key="display">
                {/* having this empty div here helps invert items and keep scroll at bottom */}
                <div className="calcScroll">
                    {getDisplay(display, radix, arabic)}
                </div>
            </div>
            <div className="calcRow">
                <div className="numPad">
                    {buttons}
                </div>
                <div className="operationPad">
                    {operations}
                </div>
            </div>
        </div>
    );
}