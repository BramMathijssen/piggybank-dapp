import "./App.css";
import Header from "./components/Header";
import piggy from "./images/piggy.png";

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <div className="header-content">
          <h1>Oink Piggybank-crypto</h1>
          <h2>CRYPTO PIGGY BANK FOR KIDS</h2>
          <button className="button">ENTER APP</button>
          
        </div>
        <div className="header-image">
          <img src={piggy} className="App-logo" alt="logo" />
        </div>
      </header>
    </div>
  );
}

export default App;
