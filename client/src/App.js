import React, { useState } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <header>
                <h1>React App 1st block</h1>
            </header>
            <p>This is a simple counter app that also uses basic HTML elements.</p>
            <div className="counter">
                <h2>Current Count: {count}</h2>
                <button onClick={() => setCount(count + 1)}>Increment</button>
                <button onClick={() => setCount(count - 1)}>Decrement</button>
                <button onClick={() => setCount(0)}>Reset</button>
            </div>
            <footer>
                <p>That's all!</p>
            </footer>
        </div>
    );
}

export default App;
