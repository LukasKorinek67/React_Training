import React from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Icon from "@mdi/react";
import { NavLink } from "react-router-dom";
import * as strings from "../text/strings";


export default function MainNavbar({hasSearchForm, handleSearchChange, hasGridToggle, gridViewTypes, gridChange, actualViewType}) {
    const location = useLocation();
    const getBrandText = () => {
        switch (location.pathname) {
            case '/recipeList':
                return strings.RECIPES_LIST;
            case '/ingredientList':
                return strings.INGREDIENTS_LIST;
            default:
                return strings.APP_NAME;
        }
    };

    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Navbar.Brand className="ps-4 font-weight-bold">{getBrandText()}</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/recipeList">{strings.RECIPES}</Nav.Link>
                <Nav.Link as={NavLink} to="/ingredientList">{strings.INGREDIENTS}</Nav.Link>
            </Nav>
            {
                hasSearchForm &&
                <Form className="d-flex ms-auto me-4 pt-0">
                    <Form.Control
                        id="searchInput"
                        type="search"
                        placeholder={strings.SEARCH}
                        className="me-1"
                        aria-label="Search"
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </Form>
            }
            {
                hasGridToggle &&
                <ButtonGroup className="pe-4">
                    {gridViewTypes.map((type) => (
                        <ToggleButton
                            key={type.value}
                            id={`type-${type.value}`}
                            type="radio"
                            variant='outline-info'
                            name="type"
                            value={type.value}
                            title={type.name}
                            checked={actualViewType === type.value}
                            onChange={(e) => gridChange(e.currentTarget.value)}
                        >
                            <Icon path={type.icon} size={1} />
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            }
            </Navbar>
        </>
    );
}