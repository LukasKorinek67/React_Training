import React from 'react';
import './styles/App.css';
import RecipesList from "./components/RecipesList";

function App() {

    return (
        <div className="App">
            <header>
                <h1>Seznam receptů</h1>
            </header>
            <RecipesList />
        </div>
    );
}

export default App;
