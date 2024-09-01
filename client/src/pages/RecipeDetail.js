import { useLocation } from 'react-router-dom';
import MainNavbar from "../components/MainNavbar";
import React, {useEffect, useState} from "react";
import requestHandler from "../services/RequestHandler";


export default function RecipeDetail() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [recipeLoadCall, setRecipeLoadCall] = useState({
        state: "pending",
    });

    useEffect(() => {
        requestHandler.getRecipe(id)
            .then(async (response) => {
                if (response.status >= 400) {
                    setRecipeLoadCall({ state: "error", error: response.data.error ? response.data.error : 'Unknown error' });
                } else {
                    setRecipeLoadCall({ state: "success", data: response.data });
                }
            })
            .catch(error => {
                console.log(error)
                setRecipeLoadCall({ state: "error", error: error.response ? error.response.data.error : 'Unknown error' });
            });;
    }, []);

    return (
        <>
            <MainNavbar />
            <h1>Detail receptu</h1>
            <p>ID receptu: {id}</p>
            {
                recipeLoadCall.state === "success" &&
                <>
                    <p>{recipeLoadCall.data.name}</p>
                    <p>{recipeLoadCall.data.description}</p>
                </>
            }
            {recipeLoadCall.state === "error" && <p>ERROR: {recipeLoadCall.error}</p>}
        </>
    );
}