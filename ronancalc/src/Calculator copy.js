import './Calculator.css';
import './App.css';
import './DataPanel.css';
import React, { useState } from 'react';
import useGlobal from './useGlobal';
import { GenerateSymbol } from './DataPanel.js';

function calculate(ops, radix = 10) {
    let runningTotal = 0;
    let lastSign = "+";
    for (let i = 0; i < ops.length; i++) {
        let value = ops[i];
        console.log(value, runningTotal)
        //check if NaN
        if (isNaN(parseInt(value, radix))) {
            lastSign = value;
            console.log(value)
        } else {
            value = parseInt(ops[i]);
            if (lastSign === "/") {
                runningTotal = runningTotal / value;
            } else if (lastSign === "x") {
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

function getSymbols(value, radix, color) {
    let radVal = value.toString(radix);
    console.log(radVal);
    let symbols = [];
    for (let i = 0; i < radVal.length; i++) {
        let number = radVal[i];
        let symbol = <div className="symbolBox">
            <img alt="broken" src={GenerateSymbol({value: number, radix, color})} />
        </div>
        symbols.push(symbol);
    }
    return symbols;
}

function getDisplay(list, radix = 10, arabic = false) {
    let display = list.map(value => {
        return divify(value, radix, arabic);
    });
    return display;
}
function chunk(stream) {
    //stream should be a string of both numbers and characters
    let unOrganized = stream.split(" ");
    let chunks = unOrganized.map(piece => {
        if (isNaN(parseInt(piece))) {
            return piece;
        }
        return parseFloat(piece);
    })
    return chunks
}
function divify(text, radix = 10, arabic = false) {
    let list = chunk(text);
    let divs = list.map(key => {
        let value = key;
        // if ( !arabic && !isNaN(parseInt(key))) {
        //     value = getSymbols(parseInt(value), radix, "white");
        // }
        return value
    });
    let row = <div className="symbolRow">
        {/* <div className="symbolBox"/> */}
        {divs}
    </div>
    return row
}

//migrate inner functions to outside
export default function Calculator() {
    const [display, setDisplay] = useState(["1", "2", "3", "1 + 1"]);
    const [radix] = useGlobal(4, "radix");
    const [arabic] = useGlobal(true, "arabic");

    let keys = [];
    for (let i = 1; i < radix; i++) {
        keys.push(i)
    }
    keys.push(0);
    let sqrt = Math.sqrt(keys.length + 1);
    let width = Math.ceil(sqrt);
    let height = Math.ceil(sqrt);
    let numbers = [];
    for (let h = 0; h < height; h++) {
        let row = [];
        for (let w = 0; w < width && width*h + w < keys.length; w++) {
            let key = keys[width*h + w];

            //stored image in radial open
            let displayedValue = <img alt="broken" src={GenerateSymbol({value: key, radix, color: "orange"})} />;
            if (arabic) {
                //regular english number display
                displayedValue = key;
            }
            
            let list = display.slice(0);
            let lastValue = list.pop() + key;
            list.push(lastValue);
            row.push(
                <button
                    className="numberButton"
                    key={key.toString()}
                    onClick={() => {
                        setDisplay(list);
                    }}
                >
                    {displayedValue}
                </button>
            );
        }
        if (row.length > 0) {
            let divRow = <div className="numberRow" key={"row" + h.toString()}>{row}</div>;
            numbers.push(divRow);
        }
    }
    
    let operations = [ " / ", " x ", " - ", " + " ].map((key) => {
        return <button className="operation" key={key} onClick={() => {
            let list = display.slice(0);
            let lastValue = list.pop().toString() + `${key}`;
            list.push(lastValue.toString());
            setDisplay(list);
        }}>{key}</button>;
    });
    operations.push(
        <button className="operation" key={"="} onClick={() => {
            //make a copy
            let list = display.slice(0);
            //grab last value
            let last = list.pop() + " =";
            let values = last.split(" ");
            list.push(last);
            //add calculation to the copy
            list.push(calculate(values));
            //set list to state
            setDisplay(list);
        }}>{"="}</button>
        );
        operations.push(
            <button className="operation" key={"c"} onClick={() => {
                //make a copy
                let list = display.slice(0);
                list.push("c");
                list.push("0");
                //set list to state
                setDisplay([...list]);
            }}>{"c"}</button>
            );

    return (
        <div className="calculator">
            <div id="display" className="display">
                <div>
                    {getDisplay(display, radix, arabic)}
                    {/* {divify("apple + 58 - 4", radix)} */}
                    {/* {testLine} */}
                </div>
            </div>
            <div className="calcRow">
                <div className="numPad">
                    {numbers}
                </div>
                <div className="operationPad">
                    {operations}
                </div>
            </div>
        </div>
    )
}