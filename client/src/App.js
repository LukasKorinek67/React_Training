import React from 'react';
import { Outlet } from "react-router-dom";
import './styles/App.css';
import Footer from "./components/Footer";
import {UserProvider} from "./context/UserProvider";

function App() {

    return (
        <>
            <UserProvider>
                <Outlet />
                <Footer />
            </UserProvider>
        </>
    );
}

export default App;
