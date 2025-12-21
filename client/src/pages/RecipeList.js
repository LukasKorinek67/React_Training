import React, {useState, useMemo} from 'react';
import RecipesBigGrid from "../components/RecipesBigGrid";
import RecipesSmallGrid from "../components/RecipesSmallGrid";
import RecipesTableList from "../components/RecipesTableList";
import MainNavbar from "../components/MainNavbar";
import CreateRecipeButton from "../components/CreateRecipeButton";
import Icon from '@mdi/react';
import {mdiGridLarge, mdiGrid, mdiTable, mdiLoading} from '@mdi/js';
import * as strings from "../text/strings";
import { useQuery } from '@tanstack/react-query';
import {getAllIngredientsQueryOptions, getAllRecipesQueryOptions} from "../queries/queryOptions";


export default function RecipeList() {
    const [viewType, setViewType] = useState('big-detail');
    const [searchBy, setSearchBy] = useState("");

    const {
        data: recipes,
        isLoading: recipesLoading,
        isError: isRecipesError,
        error: recipesError,
    } = useQuery(getAllRecipesQueryOptions());
    const {
        data: ingredients,
        isLoading: ingredientsLoading,
        isError: isIngredientsError,
        error: ingredientsError,
    } = useQuery(getAllIngredientsQueryOptions());


    const filteredRecipes = useMemo(() => {
        if (!recipes) return [];
        return recipes.filter((recipe) => {
            return (
                recipe.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
                recipe.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        });
    }, [recipes, searchBy]);

    const viewTypes = [
        { name: 'Velký detail', value: 'big-detail', icon: mdiGridLarge },
        { name: 'Malý detail', value: 'small-detail', icon: mdiGrid },
        { name: 'Tabulka', value: 'table', icon: mdiTable },
    ];

    const handleSearchChange = (searchValue) => {
        setSearchBy(searchValue);
    }

    const showRecipes = () => {
        if(recipesLoading || ingredientsLoading) {
            return (
                <div className="loading_icon">
                    <Icon size={2} path={mdiLoading} spin={true} />
                </div>
            );
        }

        if(isRecipesError || isIngredientsError) {
            const error = recipesError ?? ingredientsError;
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

        switch (viewType) {
            case "big-detail":
                return <RecipesBigGrid recipes={filteredRecipes} />;
            case "small-detail":
                return <RecipesSmallGrid recipes={filteredRecipes} ingredients={ingredients ?? []} />;
            case "table":
                return <RecipesTableList recipes={filteredRecipes} />;
            default:
                return null;
        }
    };

    return (
        <>
            <MainNavbar hasSearchForm={true}
                        handleSearchChange={handleSearchChange}
                        hasGridToggle={true}
                        gridViewTypes={viewTypes}
                        gridChange={setViewType}
                        actualViewType={viewType}/>
            <CreateRecipeButton />
            {showRecipes()}
        </>
    );
}