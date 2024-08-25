import MainNavbar from "../components/MainNavbar";
import React from "react";


export default function IngredientList() {

    function handleSearch(searchValue) {
        console.log("Search: " + searchValue);
    }

    return (
        <>
            <MainNavbar hasSearchForm={true} handleSearchChange={handleSearch}/>
            <p>IngredientList</p>
        </>
    );
}