import React, {useState, useEffect, useMemo} from 'react';
import RecipesBigGrid from "../components/RecipesBigGrid";
import RecipesSmallGrid from "../components/RecipesSmallGrid";
import RecipesTableList from "../components/RecipesTableList";
import requestHandler from '../services/RequestHandler';
import MainNavbar from "../components/MainNavbar";
import Icon from '@mdi/react';
import {mdiGridLarge, mdiGrid, mdiTable, mdiLoading} from '@mdi/js';
import * as strings from "../text/strings";


export default function RecipeList() {
    const [recipesLoadCall, setRecipesLoadCall] = useState({
        state: "pending",
    });
    const [ingredientsLoadCall, setIngredientsLoadCall] = useState({
        state: "pending",
    });
    const [viewType, setViewType] = useState('big-detail');
    const [searchBy, setSearchBy] = useState("");

    useEffect(() => {
        getAllRecipes();
        getAllIngredients();
    }, []);

    const filteredRecipes = useMemo(() => {
        if (recipesLoadCall.data != null) {
            return recipesLoadCall.data.filter((recipe) => {
                return (
                    recipe.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
                    recipe.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
                );
            });
        }
    }, [searchBy, recipesLoadCall.data]);

    function getAllRecipes() {
        requestHandler.getAllRecipes()
        .then(async (response) => {
            if (response.status >= 400) {
                setRecipesLoadCall({ state: "error", error: response.data });
            } else {
                setRecipesLoadCall({ state: "success", data: response.data });
            }
        });
    }

    function getAllIngredients() {
        requestHandler.getAllIngredients()
        .then(async (response) => {
            if (response.status >= 400) {
                setIngredientsLoadCall({ state: "error", error: response.data });
            } else {
                setIngredientsLoadCall({ state: "success", data: response.data });
            }
        });
    }

    const viewTypes = [
        { name: 'Velký detail', value: 'big-detail', icon: mdiGridLarge },
        { name: 'Malý detail', value: 'small-detail', icon: mdiGrid },
        { name: 'Tabulka', value: 'table', icon: mdiTable },
    ];

    function handleSearchChange(searchValue) {
        setSearchBy(searchValue);
    }

    function showRecipes() {
        if (recipesLoadCall.state === "success" && ingredientsLoadCall.state === "success") {
            switch(viewType) {
                case "big-detail":
                    return <RecipesBigGrid recipes={filteredRecipes}/>;
                case "small-detail":
                    return <RecipesSmallGrid recipes={filteredRecipes} ingredients={ingredientsLoadCall.data}/>;
                case "table":
                    return <RecipesTableList recipes={filteredRecipes} />;
                default:
                    return null;
            }
        } else if (recipesLoadCall.state === "error" || ingredientsLoadCall.state === "error") {
            return (
                <div className="request_error">
                    <h1>Nepodařilo se načíst data ze serveru.</h1>
                    <pre>{JSON.stringify(ingredientsLoadCall.error, null, 2)}</pre>
                </div>
            );
        } else if (recipesLoadCall.state === "pending" || ingredientsLoadCall.state === "pending") {
            return (
                <div className="loading_icon">
                    <Icon size={2} path={mdiLoading} spin={true} />
                </div>
            );
        }
    }

    return (
        <>
            <MainNavbar hasSearchForm={true}
                        handleSearchChange={handleSearchChange}
                        hasGridToggle={true}
                        gridViewTypes={viewTypes}
                        gridChange={setViewType}
                        actualViewType={viewType}/>
            {showRecipes()}
        </>
    );
}