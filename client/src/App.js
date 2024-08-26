import React from 'react';
import { Outlet } from "react-router-dom";
import './styles/App.css';
import Footer from "./components/Footer";
import {DataProvider} from "./context/DataProvider";

function App() {

    return (
        <>
            <DataProvider>
                <Outlet />
                <Footer />
            </DataProvider>
        </>
    );
}

export default App;
