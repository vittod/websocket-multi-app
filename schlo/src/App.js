// import './App.css';
import { soc } from './services/socket-service';
import { useSub } from './store';

const onClick = () => {
    soc.socketSendTest('testServerReceive');
};
function App() {
    const { result, query } = useSub(({ displayResult }) => displayResult);
    return (
        <div className="App">
            {/*<header className="App-header">*/}
            <p>Yo this is shlo app takin'</p>
            <button onClick={onClick}>send soc test</button>
            {/*</header>*/}
            {result && (
                <>
                    <div>results for query {query}</div>
                    <div>{result}</div>
                </>
            )}
        </div>
    );
}

export default App;
