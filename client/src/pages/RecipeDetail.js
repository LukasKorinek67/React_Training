import { useLocation } from 'react-router-dom';
import MainNavbar from "../components/MainNavbar";
import React from "react";
import Image from 'react-bootstrap/Image';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as strings from "../text/strings";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import {useQuery} from "@tanstack/react-query";
import {getAllIngredientsQueryOptions, getRecipeDetailQueryOptions} from "../queries/queryOptions";


export default function RecipeDetail() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const {
        data: recipe,
        isLoading: isRecipeLoading,
        isError: isRecipeError,
        error: recipeError,
    } = useQuery(getRecipeDetailQueryOptions(id));
    const {
        data: ingredients,
        isLoading: isIngredientsLoading,
        isError: isIngredientsError,
        error: ingredientsError,
    } = useQuery(getAllIngredientsQueryOptions());

    const getIngredientName = (id) => {
        const ingredient = ingredients.find(ingredient => ingredient.id === id);
        return ingredient.name;
    }

    const showRecipe = () => {
        if(isRecipeLoading || isIngredientsLoading) {
            return (
                <div className="loading_icon">
                    <Icon size={2} path={mdiLoading} spin={true} />
                </div>
            );
        }

        if(isRecipeError || isIngredientsError) {
            const error = recipeError ?? ingredientsError;
            const printableError = error instanceof Error
                ? { name: error.name, message: error.message, stack: error.stack }
                : error;
            return (
                <div className="request_error">
                    <h1>{strings.ERROR_LOAD_DATA}</h1>
                    <pre>{JSON.stringify(printableError, null, 2)}</pre>
                </div>
            );
        }

        return (
            <>
                <h1 className="text-center fw-normal m-5">{recipe.name}</h1>
                <p className="fw-light m-5">{recipe.description}</p>
                {
                    recipe.imgUri.trim() !== "" &&
                    <>
                        <Container>
                            <Row>
                                <Col className="text-center">
                                    <Image src={recipe.imgUri} alt={recipe.name} fluid rounded/>
                                </Col>
                            </Row>
                        </Container>
                    </>
                }
                {
                    (recipe.ingredients && recipe.ingredients.length > 0) &&
                    <div className="m-5">
                        <h2>{strings.INGREDIENTS}:</h2>
                        <ul>
                            {recipe.ingredients.map((ingredient) => (
                                <li key={ingredient.id + ingredient.amount}>{getIngredientName(ingredient.id)}</li>
                            ))}
                        </ul>
                    </div>
                }
            </>
        );
    }

    return (
        <>
            <MainNavbar />
            {showRecipe()}
        </>
    );
}