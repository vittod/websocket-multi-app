import './App.css';
import {soc} from "./services/socket-service";

const onClick = () => {
    soc.socketSendTest('testServerReceive' )
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Yo this is shlo app takin'
        </p>
          <button onClick={onClick}>send soc test</button>
      </header>
    </div>
  );
}

export default App;
