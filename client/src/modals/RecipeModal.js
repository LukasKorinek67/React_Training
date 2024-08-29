import React, {useState, useEffect} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Icon from "@mdi/react";
import {mdiPlus, mdiClose, mdiPencilOutline, mdiLoading} from "@mdi/js";
import * as strings from "../text/strings";
import {useData} from "../context/DataProvider";
import requestHandler from "../services/RequestHandler";
import { v4 as uuidv4 } from 'uuid';


export default function RecipeModal({recipe, show, handleClose, onComplete, mockupRecipe}) {
    const defaultForm = {
        name: "",
        description: "",
        imgUri: "",
    };
    const [recipeData, setRecipeData] = useState(defaultForm);
    const [ingredients, setIngredients] = useState([]);
    const [validated, setValidated] = useState(false);
    const [serverCall, setServerCall] = useState({ state: "inactive" })
    const {ingredientsLoadCall} = useData();

    useEffect(() => {
        if (recipe && ingredientsLoadCall.state === "success") {
            setRecipeData({
                name: recipe.name,
                description: recipe.description,
                imgUri: recipe.imgUri
            });
            let ingredientsForm = [];
            recipe.ingredients.map((ingredient) => (
                ingredientsForm.push({
                    list_uuid: uuidv4(),
                    id: ingredient.id,
                    name: getNameById(ingredient.id),
                    amount: ingredient.amount,
                    unit: ingredient.unit })
            ))
            setIngredients(ingredientsForm)
        } else {
            setRecipeData(defaultForm);
            setIngredients([]);
        }
    }, [recipe, ingredientsLoadCall.state]);

    const setRecipeField = (fieldName, fieldValue) => {
        return setRecipeData((formData) => {
            const newData = { ...formData };
            newData[fieldName] = fieldValue;
            return newData;
        });
    };

    const mockupRecipeData = () => {
        const newRecipe = mockupRecipe();
        return setRecipeData({
            name: newRecipe.name,
            description: newRecipe.description,
            imgUri: newRecipe.imgUri,
        });
    }

    const addIngredient = () => {
        const sortedData = ingredientsLoadCall.data.sort((a, b) => a.name.localeCompare(b.name));
        setIngredients([...ingredients, {
            list_uuid: uuidv4(),
            id: sortedData[ingredients.length].id,
            name: sortedData[ingredients.length].name,
            amount: null,
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
        if (ingredient !== undefined) {
            return ingredient.id;
        }
        return null;
    }

    const getNameById = (id) => {
        const ingredient = ingredientsLoadCall.data.find(ingredient => ingredient.id === id);
        if (ingredient !== undefined) {
            return ingredient.name;
        }
        return null;
    }

    const updateIngredient = (index, amount, unit) => {
        const newIngredients = [...ingredients];
        newIngredients[index].amount = parseFloat(amount);
        newIngredients[index].unit = unit;
        setIngredients(newIngredients);
    }

    const resetModal = () => {
        setRecipeData({
            name: "",
            description: "",
            imgUri: ""
        });
        setIngredients([]);
        setValidated(false);
    }

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        let recipePayLoad = {
            ...recipeData,
            "ingredients": ingredients.map(({ list_uuid, name, ...rest }) => rest)
        };
        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        setServerCall({ state: "pending" });

        if(recipe) {
            //update
            recipePayLoad = {
                ...recipePayLoad,
                "id": recipe.id
            }
            requestHandler.updateRecipe(recipePayLoad)
                .then(async (response) => {
                    console.log(response)
                    if (response.status >= 400) {
                        //error
                        setServerCall({state: "error", error: response.data});
                    } else {
                        //success
                        setServerCall({state: "success", data: response.data});
                        onComplete();
                        handleClose();
                        resetModal()
                    }
                });
        } else {
            //create
            requestHandler.addNewRecipe(recipePayLoad)
                .then(async (response) => {
                    console.log(response)
                    if (response.status >= 400) {
                        //error
                        setServerCall({state: "error", error: response.data});
                    } else {
                        //success
                        setServerCall({state: "success", data: response.data});
                        onComplete();
                        handleClose();
                        resetModal()
                    }
                });
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {recipe ? strings.EDIT_RECIPE : strings.CREATE_RECIPE}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.MODAL_RECIPE_NAME}</Form.Label>
                            <Form.Control
                                value={recipeData.name}
                                type="text"
                                as="input"
                                placeholder={strings.MODAL_RECIPE_NAME_PLACEHOLDER}
                                onChange={(e) => setRecipeField("name", e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">{strings.MODAL_VALIDATION_RECIPE_NAME}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.MODAL_PROCESS}</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                rows={5}
                                value={recipeData.description}
                                placeholder={strings.MODAL_PROCESS_PLACEHOLDER}
                                onChange={(e) => setRecipeField("description", e.target.value)}
                                required
                                maxLength={10000}
                            />
                            <Form.Control.Feedback type="invalid">{strings.MODAL_VALIDATION_PROCESS}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{strings.MODAL_IMAGE}</Form.Label>
                            <Form.Control
                                value={recipeData.imgUri}
                                type="text"
                                as="input"
                                placeholder={strings.MODAL_IMAGE_PLACEHOLDER}
                                onChange={(e) => setRecipeField("imgUri", e.target.value)}
                            />
                            <Form.Control.Feedback type="valid">{strings.MODAL_VALIDATION_OPTIONAL}</Form.Control.Feedback>
                        </Form.Group>
                        {mockupRecipe &&
                            <div className="d-flex">
                                <Button size="sm" variant="link" className="ms-auto mb-3 text-secondary" onClick={mockupRecipeData}>
                                    {strings.MODAL_MOCKUP_BUTTON}
                                </Button>
                            </div>
                        }
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
                                                required
                                            >
                                                {ingredientsLoadCall.state === "success" &&
                                                    ingredientsLoadCall.data
                                                        .sort((a, b) => a.name.localeCompare(b.name))
                                                        .map((ingredient) => (
                                                            <option key={ingredient.id}>{ingredient.name}</option>
                                                        ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">{strings.MODAL_VALIDATION_INGREDIENT_NAME}</Form.Control.Feedback>
                                        </Col>
                                        <Col xs={2} className="pe-0">
                                            <Form.Control
                                                type="number"
                                                as="input"
                                                value={ingredient.amount}
                                                onChange={(e) => updateIngredient(index, e.target.value, ingredient.unit)}
                                                required
                                                min={0}
                                                max={999999}
                                            />
                                            <Form.Control.Feedback type="invalid">{strings.MODAL_VALIDATION_INGREDIENT_AMOUNT}</Form.Control.Feedback>
                                        </Col>
                                        <Col xs={2} className="pe-0">
                                            <Form.Control
                                                type="text"
                                                as="input"
                                                value={ingredient.unit}
                                                onChange={(e) => updateIngredient(index, ingredient.amount, e.target.value)}
                                                required
                                                maxLength={8}
                                            />
                                            <Form.Control.Feedback type="invalid">{strings.MODAL_VALIDATION_INGREDIENT_UNIT}</Form.Control.Feedback>
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
                        { serverCall.state === "error" &&
                            <Form.Text className="text-center text-danger fw-semibold">Error: {serverCall.error.errorMessage}</Form.Text>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>
                            <Icon size={0.8} path={mdiClose} className="me-1 pb-1"/>
                            {strings.CANCEL}
                        </Button>
                        <Button variant="outline-info" type="submit" disabled={serverCall.state === "pending"}>
                            { serverCall.state === "pending" ?
                                (<Icon size={0.8} path={mdiLoading} spin={true} className="me-1 pb-1" />) :
                                (<Icon size={0.8} path={recipe ? mdiPencilOutline : mdiPlus} className="me-1 pb-1" />)
                            }
                            {recipe ? strings.EDIT : strings.CREATE}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}