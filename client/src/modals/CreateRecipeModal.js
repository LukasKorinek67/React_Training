import React from "react";
import RecipeModal from "./RecipeModal";


export default function CreateRecipeModal({show, handleClose, onComplete}) {

    return (
        <>
            <RecipeModal
                show={show}
                handleClose={handleClose}
                onComplete={onComplete}/>
        </>
    );
}