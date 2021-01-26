import './App.css';
import './DataPanel.css';
import Vector from './math.js';
import React from 'react';
import useGlobal from './useGlobal.js';

export function GenerateSymbol(props) {
    let {value, radix, color = "orange"} = props;
    let scale = 10;
    let girth = 1;
    let center = new Vector(scale + girth, scale + girth);
    let fullCircle = -Math.PI * 2;
    let radianScale = fullCircle / radix;
    let rotation = fullCircle / radix / 2;
    let pointStore = "";

    let tickCount = value % radix === 0 ? radix : value % radix;
    for (let i = 0; i <= tickCount; i++) {
        let x = Math.sin(radianScale * i + rotation);
        let y = Math.cos(radianScale * i + rotation);
        let point = center.add(new Vector(x, y).scale(scale));
        pointStore = pointStore + point.x + " " + point.y + " ";
        if (i === parseInt(radix)) {
            pointStore = pointStore + 0 + " " + point.y;
        }
    }
    let url = `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="-4 -5 30 30" xml:space="preserve">
        <g>
            <polyline points="${pointStore}" stroke="${color}" fill="transparent" strokeWidth="${girth}"/>
        </g>
    </svg>`
    // console.log(url);
    return url
}

export function getSymbols(value, radix, color = "black") {
    let radVal = value.toString();
    // console.log(radVal);
    let symbols = [];
    if (radVal < 0) {
        symbols.push("-");
    }
    for (let i = 0; i < radVal.length; i++) {
        let number = parseInt(radVal[i], radix);
        let symbol = <div key={value + "#: " + i} className="symbolBox">
            <img alt="broken" src={GenerateSymbol({value: number, radix, color})} />
        </div>
        symbols.push(symbol);
    }
    return symbols;
}
export function calcToSymbols(calc, radix, color = "black") {
    let chunks = calc.split(" ");
    let statements = [];
    statements.push(<div key={"fillStart: " + calc} className="fillBox" />);
    chunks.forEach(unit => {
        if (isNaN(parseInt(unit, radix))) {
            statements.push(unit);
        } else {
            statements.push(getSymbols(unit, radix, color));
        }
    });
    //after centering div
    statements.push(<div key={"fillEnd: " + calc} className="fillBox" />);
    return <div key={calc} className="symbolRow">
        {statements}
    </div>
}
//symbol box class?

export default function DataPanel() {
    const [radix, setRadix] = useGlobal(4, "radix");
    const [arabic, setArabic] = useGlobal(false, "arabic");
    let floor = 2;
    let ceiling = 36;

    return (
        <div className="dataTap">
            <img className="radixDisplay" alt="broken" src={GenerateSymbol({value:0, radix, color:"orange"})} />
            <div className="inputBar">
                <div className="radixLabel">
                    Radix:
                    <input
                        className="ronanInput"
                        type="number"
                        defaultValue={radix}
                        onChange={(e) => { 
                            if (e.target.value < floor) {
                                e.target.value = floor;
                            } else if (e.target.value > ceiling) {
                                e.target.value = ceiling;
                            }
                            setRadix(e.target.value);
                        }}
                    />
                </div>
                <div className="radixLabel">
                    Western Arabic:
                    <input
                        className="systemBox"
                        type="checkbox"
                        checked = {arabic}
                        onChange={(e) => {
                            setArabic(e.target.checked);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}