import {useState, useEffect, useMemo} from 'react';
import recipesData from '../mockup-data/recipes.json';
import Navbar from "react-bootstrap/Navbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import RecipesBigGrid from "./RecipesBigGrid";
import RecipesSmallGrid from "./RecipesSmallGrid";
import RecipesTableList from "./RecipesTableList";

import Icon from '@mdi/react';
import { mdiGridLarge, mdiGrid, mdiTable } from '@mdi/js';


export default function RecipesList() {
    const [recipes, setRecipes] = useState(null);
    const [viewType, setViewType] = useState('big-detail');
    const [searchBy, setSearchBy] = useState("");

    useEffect(() => {
        getAllRecipes();
    }, []);

    const filteredRecipes = useMemo(() => {
        if (recipes != null) {
            return recipes.filter((recipe) => {
                return (
                    recipe.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
                    recipe.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
                );
            });
        }
    }, [searchBy, recipes]);

    function getAllRecipes() {
        // tady by bylo volání na backend

        setRecipes(recipesData);
    }

    const viewTypes = [
        { name: 'Velký detail', value: 'big-detail', icon: mdiGridLarge },
        { name: 'Malý detail', value: 'small-detail', icon: mdiGrid },
        { name: 'Tabulka', value: 'table', icon: mdiTable },
    ];

    function handleSearchChange(event) {
        setSearchBy(event.target.value);
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

            {viewType === 'big-detail' && <RecipesBigGrid recipes={filteredRecipes}/>}
            {viewType === 'small-detail' && <RecipesSmallGrid recipes={filteredRecipes}/>}
            {viewType === 'table' && <RecipesTableList recipes={filteredRecipes} />}
        </>
    );
}