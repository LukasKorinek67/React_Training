import MainNavbar from "../components/MainNavbar";
import React from "react";
import * as strings from "../text/strings";


export default function NotFoundPage() {

    return (
        <>
            <MainNavbar />
            <h1 className="text-center fw-normal m-5">{strings.NOT_FOUND_HEADER}</h1>
            <p className="fw-light m-5">{strings.NOT_FOUND_TEXT}</p>
        </>
    );
}