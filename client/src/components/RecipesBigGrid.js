import Card from "react-bootstrap/Card";
import Icon from '@mdi/react';
import { mdiFoodForkDrink } from '@mdi/js';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function RecipesBigGrid({recipes}) {
    return (
        <>
            <Row className="g-4 m-1">
                {recipes && recipes.map((recipe) => (
                    <Col key={recipe.id}>
                        <Card className={"recipe-card"} border="info">
                            <Card.Title>
                                <Icon path={mdiFoodForkDrink} size={1.2} color="var(--bs-info)"/>
                                {recipe.name}
                            </Card.Title>
                            <Card.Body>
                                {/* Obrázek - kdyby byl správný odkaz
                                <Card.Img variant="top" src={recipe.imgUri} alt={recipe.name} />
                                */}
                                <Card.Text>{recipe.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}