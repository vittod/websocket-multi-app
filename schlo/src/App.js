import './App.css';
import { soc } from './services/socket-service';
import { useSub } from './store';

const onClick = () => {
    soc.socketSendTest('testServerReceive');
};
function App() {
    const { result, query } = useSub(({ displayResult }) => displayResult);
    return (
        <div className="schlo-app">
            <header className="schlo-header">
                <p>Yo this is shlo app takin'</p>
                <button onClick={onClick}>send soc test</button>
                {result && (
                    <>
                        <div>results for query {query}</div>
                        <div>{result}</div>
                    </>
                )}
            </header>
        </div>
    );
}

export default App;
