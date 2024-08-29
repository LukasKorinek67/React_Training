import React from 'react';
import { Outlet } from "react-router-dom";
import './styles/App.css';
import Footer from "./components/Footer";
import {DataProvider} from "./context/DataProvider";
import {UserProvider} from "./context/UserProvider";

function App() {

    return (
        <>
            <UserProvider>
                <DataProvider>
                    <Outlet />
                    <Footer />
                </DataProvider>
            </UserProvider>
        </>
    );
}

export default App;
