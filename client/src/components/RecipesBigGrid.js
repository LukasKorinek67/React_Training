import Card from "react-bootstrap/Card";
import Icon from '@mdi/react';
import {mdiFoodForkDrink} from '@mdi/js';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ModifyRecipeButtons from "./ModifyRecipeButtons";
import Container from "react-bootstrap/Container";
import {useNavigate} from "react-router-dom";

export default function RecipesBigGrid({recipes}) {
    const navigate = useNavigate();

    const handleCardClick = (event, id) => {
        navigate(`/recipeDetail?id=${id}`);
    };

    return (
        <>
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
                                <Card.Text>{recipe.description}</Card.Text>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <ModifyRecipeButtons recipe={recipe}/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            </Container>
        </>
    );
}