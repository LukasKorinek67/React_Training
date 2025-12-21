import MainNavbar from "../components/MainNavbar";
import React, {useMemo, useState} from "react";
import Icon from "@mdi/react";
import {mdiFoodVariant, mdiLoading} from "@mdi/js";
import ListGroup from 'react-bootstrap/ListGroup';
import * as strings from "../text/strings";
import {useQuery} from "@tanstack/react-query";
import {getAllIngredientsQueryOptions} from "../queries/queryOptions";


export default function IngredientList() {
    const [searchBy, setSearchBy] = useState("");
    const {
        data: ingredients,
        isLoading: isIngredientsLoading,
        isError: isIngredientsError,
        error: ingredientsError,
    } = useQuery(getAllIngredientsQueryOptions());


    const filteredIngredients = useMemo(() => {
        if (!ingredients) return [];
        return ingredients.filter((ingredient) => {
            return (ingredient.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()));
        });
    }, [ingredients, searchBy]);

    const handleSearch = (searchValue) => {
        setSearchBy(searchValue);
    }

    const showIngredients = () => {
        if(isIngredientsLoading) {
            return (
                <div className="loading_icon">
                    <Icon size={2} path={mdiLoading} spin={true} />
                </div>
            );
        }

        if(isIngredientsError) {
            const printableError = ingredientsError instanceof Error
                ? { name: ingredientsError.name, message: ingredientsError.message, stack: ingredientsError.stack }
                : ingredientsError;
            return (
                <div className="request_error">
                    <h1>{strings.ERROR_LOAD_DATA}</h1>
                    <pre>{JSON.stringify(printableError, null, 2)}</pre>
                </div>
            );
        }

        return <ListGroup className="m-5">
            {
                filteredIngredients.map((ingredient) => (
                    <ListGroup.Item key={ingredient.id}>
                        <Icon size={1} path={mdiFoodVariant} color="var(--bs-info)" className="me-2"/>
                        {ingredient.name}
                    </ListGroup.Item>
                ))
            }
        </ListGroup>;
    }

    return (
        <>
            <MainNavbar hasSearchForm={true} handleSearchChange={handleSearch}/>
            {showIngredients()}
        </>
    );
}