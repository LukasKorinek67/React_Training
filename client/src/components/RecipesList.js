import Recipe from "./Recipe";
import {useState, useEffect} from 'react';
import recipesData from '../mockup-data/recipes.json';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function RecipesList() {
    const [recipes, setRecipes] = useState(null);
    useEffect(() => {
        getAllRecipes();
    }, []);

    function getAllRecipes() {
        // tady by bylo volání na backend

        setRecipes(recipesData);
    }

    return (
        <>
            <Row className="g-4">
                {recipes && recipes.map((recipe) => (
                    <Col key={recipe.id}>
                        <Recipe recipe={recipe} />
                    </Col>
                ))}
            </Row>
        </>
    );
}