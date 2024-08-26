import Card from "react-bootstrap/Card";
import Icon from '@mdi/react';
import { mdiFoodForkDrink } from '@mdi/js';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function RecipesSmallGrid({recipes, ingredients}) {

    const getIngredientName = (id) => {
        const ingredient = ingredients.find(ingredient => ingredient.id === id);
        return ingredient.name;
    }

    return (
        <Row className="g-4 m-1">
            {recipes && recipes.map((recipe) => (
                <Col key={recipe.id}>
                    <Card className="recipe-card" border="info">
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
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}