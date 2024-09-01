import Card from "react-bootstrap/Card";
import Icon from '@mdi/react';
import {mdiFoodForkDrink} from '@mdi/js';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModifyRecipeButtons from "./ModifyRecipeButtons";
import Container from "react-bootstrap/Container";
import {useNavigate} from "react-router-dom";

export default function RecipesSmallGrid({recipes, ingredients}) {
    const navigate = useNavigate();

    const handleCardClick = (event, id) => {
        navigate(`/recipeDetail?id=${id}`);
    };

    const getIngredientName = (id) => {
        const ingredient = ingredients.find(ingredient => ingredient.id === id);
        return ingredient.name;
    }

    return (
        <Container fluid>
            <Row className="g-4 m-1 ms-5" xs="auto" sm="auto">
                {recipes && recipes.map((recipe) => (
                    <Col key={recipe.id}>
                        <Card className="recipe-card" border="info" onClick={(e) => handleCardClick(e, recipe.id)} role='button'>
                            <Card.Title>
                                <Icon path={mdiFoodForkDrink} size={1.2} color="var(--bs-info)"/>
                                {recipe.name}
                            </Card.Title>
                            <Card.Body>
                                {recipe.imgUri.trim() !== "" &&
                                    <Card.Img variant="top" src={recipe.imgUri} alt={recipe.name} className="mb-3"/>
                                }
                                <Card.Text className="small-grid">{recipe.description}</Card.Text>
                                <ul>
                                    {recipe.ingredients && recipe.ingredients.map((ingredient) => (
                                        <li key={ingredient.id + ingredient.amount}>{getIngredientName(ingredient.id)}</li>
                                    ))}
                                </ul>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <ModifyRecipeButtons recipe={recipe}/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}