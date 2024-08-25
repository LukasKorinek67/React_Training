import React from 'react';
import { Outlet } from "react-router-dom";
import './styles/App.css';
import Footer from "./components/Footer";

function App() {

    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
