import MainNavbar from "../components/MainNavbar";
import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import * as strings from "../text/strings";

export default function Home() {

    return (
        <>
            <MainNavbar />
            <Carousel>
                <Carousel.Item>
                    <Link to="/recipeList">
                        <img
                            className="d-block w-100"
                            src="carousel_recipes.png"
                            alt={strings.RECIPES_LIST}
                            style={{ height: '700px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption>
                            <h3>{strings.RECIPES_LIST}</h3>
                            <p>{strings.CAROUSEL_GO_TO_RECIPES}</p>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to="/ingredientList">
                        <img
                            className="d-block w-100"
                            src="carousel_ingredients.png"
                            alt={strings.INGREDIENTS_LIST}
                            style={{ height: '700px', objectFit: 'cover' }}
                        />
                        <Carousel.Caption>
                            <h3>{strings.INGREDIENTS_LIST}</h3>
                            <p>{strings.CAROUSEL_GO_TO_INGREDIENTS}</p>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            </Carousel>
        </>
    );
}