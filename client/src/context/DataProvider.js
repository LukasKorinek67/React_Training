import React, {createContext, useState, useEffect, useContext} from 'react';
import requestHandler from "../services/RequestHandler";

const DataContext = createContext(null);

export function DataProvider({ children }) {
    const [recipesLoadCall, setRecipesLoadCall] = useState({
        state: "pending",
    });
    const [ingredientsLoadCall, setIngredientsLoadCall] = useState({
        state: "pending",
    });


    useEffect(() => {
        getAllRecipes();
        getAllIngredients();
    }, []);

    const getAllRecipes = () => {
        requestHandler.getAllRecipes()
            .then(async (response) => {
                if (response.status >= 400) {
                    setRecipesLoadCall({ state: "error", error: response.data });
                } else {
                    setRecipesLoadCall({ state: "success", data: response.data });
                }
            });
    }

    const getAllIngredients = () => {
        requestHandler.getAllIngredients()
            .then(async (response) => {
                if (response.status >= 400) {
                    setIngredientsLoadCall({ state: "error", error: response.data });
                } else {
                    setIngredientsLoadCall({ state: "success", data: response.data });
                }
            });
    }

    const reloadData = () => {
        getAllRecipes();
        getAllIngredients();
    }

    return (
        <DataContext.Provider value={{ recipesLoadCall, ingredientsLoadCall, reloadData }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}