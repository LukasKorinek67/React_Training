import React from "react";
import RecipeModal from "./RecipeModal";

export default function EditRecipeModal({recipe, show, handleClose, onComplete}) {

    return (
        <>
            <RecipeModal
                recipe={recipe}
                show={show}
                handleClose={handleClose}
                onComplete={onComplete}/>
        </>
    );
}