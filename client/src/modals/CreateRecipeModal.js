import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Icon from "@mdi/react";
import {mdiPlus, mdiClose} from "@mdi/js";
import * as strings from "../text/strings";
import {useData} from "../context/DataProvider";
import requestHandler from "../services/RequestHandler";
import { v4 as uuidv4 } from 'uuid';


export default function CreateRecipeModal({show, handleClose}) {
    const [recipeData, setRecipeData] = useState({
        name: "",
        description: "",
        imgUri: ""
    });
    const [ingredients, setIngredients] = useState([]);
    const {ingredientsLoadCall} = useData();

    const setRecipeField = (fieldName, fieldValue) => {
        return setRecipeData((formData) => {
            const newData = { ...formData };
            newData[fieldName] = fieldValue;
            return newData;
        });
    };

    const addIngredient = () => {
        setIngredients([...ingredients, {
            list_uuid: uuidv4(),
            id: ingredientsLoadCall.data[ingredients.length].id,
            name: ingredientsLoadCall.data[ingredients.length].name,
            amount: '',
            unit: '' }]);
    };

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const updateIngredientName = (index, name) => {
        const newIngredients = [...ingredients];
        newIngredients[index].name = name;
        newIngredients[index].id = getIdByName(name);
        setIngredients(newIngredients);
    }

    const getIdByName = (name) => {
        const ingredient = ingredientsLoadCall.data.find(ingredient => ingredient.name === name);
        return ingredient.id;
    }

    const updateIngredient = (index, amount, unit) => {
        const newIngredients = [...ingredients];
        newIngredients[index].amount = amount;
        newIngredients[index].unit = unit;
        setIngredients(newIngredients);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const recipe = {
            ...recipeData,
            "ingredients": ingredients.map(({ list_uuid, name, ...rest }) => rest)
        };
        requestHandler.addNewRecipe(recipe)
        /*.then(async (response) => {
            console.log(response)
            if (response.status >= 400) {
                //error
            } else {
                //success
            }
        });*/
        //handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{strings.CREATE_RECIPE}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.MODAL_RECIPE_NAME}</Form.Label>
                            <Form.Control
                                type="text"
                                as="input"
                                placeholder={strings.MODAL_RECIPE_NAME_PLACEHOLDER}
                                onChange={(e) => setRecipeField("name", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.MODAL_PROCESS}</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                rows={4}
                                placeholder={strings.MODAL_PROCESS_PLACEHOLDER}
                                onChange={(e) => setRecipeField("description", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Container className="ms-0 ps-0">
                                { (ingredients.length > 0) &&
                                    <Row>
                                        <Col xs={7}>
                                            <Form.Label>{strings.MODAL_INGREDIENTS}</Form.Label>
                                        </Col>
                                        <Col xs={2}>
                                            <Form.Label>{strings.MODAL_INGREDIENTS_AMOUNT}</Form.Label>
                                        </Col>
                                        <Col xs={2}>
                                            <Form.Label>{strings.MODAL_INGREDIENTS_UNIT}</Form.Label>
                                        </Col>
                                    </Row>
                                }
                                {ingredients.map((ingredient, index) => (
                                    <Row key={ingredient.list_uuid} className="mb-1">
                                        <Col xs={7} className="pe-0">
                                            <Form.Select
                                                value={ingredient.name}
                                                onChange={(e) => updateIngredientName(index, e.target.value)}
                                            >
                                                {ingredientsLoadCall.state === "success" &&
                                                    ingredientsLoadCall.data.map((ingredient) => (
                                                        <option key={ingredient.id}>{ingredient.name}</option>
                                                        ))}
                                            </Form.Select>
                                        </Col>
                                        <Col xs={2} className="pe-0">
                                            <Form.Control
                                                type="number"
                                                as="input"
                                                value={ingredient.amount}
                                                onChange={(e) => updateIngredient(index, e.target.value, ingredient.unit)}
                                            />
                                        </Col>
                                        <Col xs={2} className="pe-0">
                                            <Form.Control
                                                type="text"
                                                as="input"
                                                value={ingredient.unit}
                                                onChange={(e) => updateIngredient(index, ingredient.amount, e.target.value)}
                                            />
                                        </Col>
                                        <Col xs={1}>
                                            <Button variant="outline-danger" size="sm" onClick={() => removeIngredient(index)}>
                                                <Icon size={1} path={mdiClose}/>
                                            </Button>
                                        </Col>
                                    </Row>
                                ))}
                            </Container>
                            <Button size="sm" variant="light" className="mb-3" onClick={addIngredient}>
                                <Icon size={0.8} path={mdiPlus} className="me-1 pb-1"/>
                                {strings.MODAL_INGREDIENTS_ADD}
                            </Button>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            <Icon size={0.8} path={mdiClose} className="me-1 pb-1"/>
                            {strings.MODAL_BUTTON_CANCEL}
                        </Button>
                        <Button variant="outline-info" type="submit">
                            <Icon size={0.8} path={mdiPlus} className="me-1 pb-1"/>
                            {strings.MODAL_BUTTON_CREATE}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}