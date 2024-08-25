import MainNavbar from "../components/MainNavbar";
import React, {useEffect, useMemo, useState} from "react";
import requestHandler from "../services/RequestHandler";
import Icon from "@mdi/react";
import {mdiFoodVariant, mdiLoading} from "@mdi/js";
import ListGroup from 'react-bootstrap/ListGroup';
import * as strings from "../text/strings";


export default function IngredientList() {
    const [ingredientsLoadCall, setIngredientsLoadCall] = useState({
        state: "pending",
    });
    const [searchBy, setSearchBy] = useState("");

    useEffect(() => {
        getAllIngredients();
    }, []);

    const filteredIngredients = useMemo(() => {
        if (ingredientsLoadCall.data != null) {
            return ingredientsLoadCall.data.filter((ingredient) => {
                return (ingredient.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()));
            });
        }
    }, [searchBy, ingredientsLoadCall.data]);

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

    function handleSearch(searchValue) {
        setSearchBy(searchValue);
    }

    function showIngredients() {
        if (ingredientsLoadCall.state === "success") {
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
        } else if (ingredientsLoadCall.state === "error") {
            return (
                <div className="request_error">
                    <h1>{strings.ERROR_LOAD_DATA}</h1>
                    <pre>{JSON.stringify(ingredientsLoadCall.error, null, 2)}</pre>
                </div>
            );
        } else {
            return (
                <div className="loading_icon">
                    <Icon size={2} path={mdiLoading} spin={true} />
                </div>
            );
        }
    }

    return (
        <>
            <MainNavbar hasSearchForm={true} handleSearchChange={handleSearch}/>
            {showIngredients()}
        </>
    );
}