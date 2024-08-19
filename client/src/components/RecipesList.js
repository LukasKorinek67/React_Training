import {useState, useEffect, useMemo} from 'react';
import Navbar from "react-bootstrap/Navbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import RecipesBigGrid from "./RecipesBigGrid";
import RecipesSmallGrid from "./RecipesSmallGrid";
import RecipesTableList from "./RecipesTableList";
import requestHandler from '../services/RequestHandler';

import Icon from '@mdi/react';
import {mdiGridLarge, mdiGrid, mdiTable, mdiLoading} from '@mdi/js';


export default function RecipesList() {
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

    function handleSearchChange(event) {
        setSearchBy(event.target.value);
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
            <Navbar bg="dark" >
                <Navbar.Brand className="ps-4 mt-1 text-light font-weight-bold">Seznam receptů</Navbar.Brand>
                <Form className="d-flex ms-auto me-4 pt-0">
                    <Form.Control
                        id="searchInput"
                        type="search"
                        placeholder="Hledat"
                        className="me-1"
                        aria-label="Search"
                        onChange={handleSearchChange}
                    />
                </Form>
                <ButtonGroup className="pe-4">
                    {viewTypes.map((type) => (
                        <ToggleButton
                            key={type.value}
                            id={`type-${type.value}`}
                            type="radio"
                            variant='outline-info'
                            name="type"
                            value={type.value}
                            checked={viewType === type.value}
                            onChange={(e) => setViewType(e.currentTarget.value)}
                        >
                            <Icon path={type.icon} size={1} />
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </Navbar>

            {showRecipes()}
        </>
    );
}