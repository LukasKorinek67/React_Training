import Card from "react-bootstrap/Card";
import Icon from '@mdi/react';
import {mdiFoodForkDrink} from '@mdi/js';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ModifyRecipeButtons from "./ModifyRecipeButtons";
import Container from "react-bootstrap/Container";

export default function RecipesBigGrid({recipes}) {
    return (
        <>
            <Container fluid>
            <Row className="g-4 m-1 ms-5" xs="auto" sm="auto">
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
                                <Card.Text>{recipe.description}</Card.Text>
                                <ModifyRecipeButtons recipe={recipe}/>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            </Container>
        </>
    );
}