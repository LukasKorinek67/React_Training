import React from "react";
import RecipeModal from "./RecipeModal";
import newRecipesData from '../mockup-data/new_recipes.json';


export default function CreateRecipeModal({show, handleClose, onComplete}) {

    const mockupRecipe = () => {
        const randomIndex = Math.floor(Math.random() * newRecipesData.length);
        return newRecipesData[randomIndex];
    }

    return (
        <>
            <RecipeModal
                show={show}
                handleClose={handleClose}
                onComplete={onComplete}
                mockupRecipe={mockupRecipe}
            />
        </>
    );
}