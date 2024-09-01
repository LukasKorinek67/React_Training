import React from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Icon from "@mdi/react";
import { mdiBookOpenVariantOutline } from '@mdi/js';
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
            <Navbar bg="dark" data-bs-theme="dark" expand="md">
                <Navbar.Brand className="ps-4 font-weight-bold">
                    <Icon path={mdiBookOpenVariantOutline} size={1.5} className="me-3 pb-1" color="var(--bs-info)"/>
                    {getBrandText()}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto ms-4 ms-md-0 mb-2 mb-md-0">
                        <Nav.Link as={NavLink} to="/recipeList">{strings.RECIPES}</Nav.Link>
                        <Nav.Link as={NavLink} to="/ingredientList">{strings.INGREDIENTS}</Nav.Link>
                    </Nav>
                    {
                        hasSearchForm &&
                        <Form className="d-flex ms-4 ms-md-auto me-4 pt-0">
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
                        <div className="text-center mt-2 mt-md-0">
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
                        </div>
                    }
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}