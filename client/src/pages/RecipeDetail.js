import { useLocation } from 'react-router-dom';
import MainNavbar from "../components/MainNavbar";
import React, {useEffect, useState} from "react";
import requestHandler from "../services/RequestHandler";
import Image from 'react-bootstrap/Image';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useData} from "../context/DataProvider";
import * as strings from "../text/strings";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";


export default function RecipeDetail() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [recipeLoadCall, setRecipeLoadCall] = useState({
        state: "pending",
    });
    const { ingredientsLoadCall } = useData();

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
            });
    }, []);

    const getIngredientName = (id) => {
        const ingredient = ingredientsLoadCall.data.find(ingredient => ingredient.id === id);
        return ingredient.name;
    }

    const showRecipe = () => {
        if (recipeLoadCall.state === "success") {
            return (
                <>
                    <h1 className="text-center fw-normal m-5">{recipeLoadCall.data.name}</h1>
                    <p className="fw-light m-5">{recipeLoadCall.data.description}</p>
                    {
                        recipeLoadCall.data.imgUri.trim() !== "" &&
                        <>
                            <Container>
                                <Row>
                                    <Col className="text-center">
                                        <Image src={recipeLoadCall.data.imgUri} alt={recipeLoadCall.data.name} fluid
                                               rounded/>
                                    </Col>
                                </Row>
                            </Container>
                        </>
                    }
                    {
                        (recipeLoadCall.data.ingredients && recipeLoadCall.data.ingredients.length > 0) &&
                        <div className="m-5">
                            <h2>{strings.INGREDIENTS}:</h2>
                            <ul>
                                {recipeLoadCall.data.ingredients.map((ingredient) => (
                                    <li key={ingredient.id + ingredient.amount}>{getIngredientName(ingredient.id)}</li>
                                ))}
                            </ul>
                        </div>
                    }
                </>
            );
        } else if (recipeLoadCall.state === "error") {
            return (
                <div className="request_error">
                    <h1>{strings.ERROR_LOAD_DATA}</h1>
                    <pre>{JSON.stringify(recipeLoadCall.error, null, 2)}</pre>
                </div>
            );
        } else if (recipeLoadCall.state === "pending") {
            return (
                <div className="loading_icon">
                    <Icon size={2} path={mdiLoading} spin={true}/>
                </div>
            );
        }
    }

    return (
        <>
            <MainNavbar />
            {showRecipe()}
        </>
    );
}