import './App.css';
import Calculator from './Calculator.js';
import DataPanel from './DataPanel.js';

function Banner() {
  let acronym = "RoNaN System";
  let word = "Radial-open, Not a Number System";
  return (
    <div className="banner">
      <div className="acronym">
        {acronym}
        <br></br>
      </div>
        {word}
    </div>
  )
}

function App() {
  return (
    <div className="App">
        <Banner />
        <div className="row">
          <DataPanel />
          <Calculator />
        </div>
        <text>
          RoNaN recommended radix range(oooh alliteration) is between 3-8, and 12 if you think of a clock.
        </text>
        <br/>
        <text>
          This is just a calculator to help me test my wacky number system, Pay no attention to the wonky CSS behind the curtain.
        </text>
        <p>
          Designed and Developed by Orion Nye
        </p>
    </div>
  );
}

export default App;
