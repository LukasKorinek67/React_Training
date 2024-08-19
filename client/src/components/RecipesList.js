import {useState, useEffect} from 'react';
import recipesData from '../mockup-data/recipes.json';
import Navbar from "react-bootstrap/Navbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import RecipesBigGrid from "./RecipesBigGrid";
import RecipesSmallGrid from "./RecipesSmallGrid";
import RecipesTableList from "./RecipesTableList";

import Icon from '@mdi/react';
import { mdiGridLarge, mdiGrid, mdiTable } from '@mdi/js';


export default function RecipesList() {
    const [recipes, setRecipes] = useState(null);
    const [viewType, setViewType] = useState('big-detail');

    useEffect(() => {
        getAllRecipes();
    }, []);

    function getAllRecipes() {
        // tady by bylo volání na backend

        setRecipes(recipesData);
    }

    const viewTypes = [
        { name: 'Velký detail', value: 'big-detail', icon: mdiGridLarge },
        { name: 'Malý detail', value: 'small-detail', icon: mdiGrid },
        { name: 'Tabulka', value: 'table', icon: mdiTable },
    ];

    return (
        <>
            <Navbar bg="light" >
                <Navbar.Brand className="ps-4">Seznam receptů</Navbar.Brand>
                <ButtonGroup className="mb-4 ms-auto pe-4 pt-2">
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

            {viewType === 'big-detail' && <RecipesBigGrid recipes={recipes}/>}
            {viewType === 'small-detail' && <RecipesSmallGrid recipes={recipes}/>}
            {viewType === 'table' && <RecipesTableList recipes={recipes} />}
        </>
    );
}