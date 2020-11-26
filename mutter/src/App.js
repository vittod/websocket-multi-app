import logo from './logo.svg';
import './App.css';
import {AddButton} from './AddButton'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          I am your mother, luke!
        </p>
          <br />
          <AddButton />

      </header>
    </div>
  );
}

export default App;
