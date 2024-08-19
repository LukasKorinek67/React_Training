import Table from 'react-bootstrap/Table';

export default function RecipesTableList({recipes}) {
    return (
        <>
            <Table striped bordered hover className="m-3">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                    {recipes && recipes.map((recipe, index) => (
                        <tr key={recipe.id}>
                            <td>{index + 1}</td>
                            <td>{recipe.name}</td>
                            <td>{recipe.description}</td>
                        </tr>
                        ))}
                </tbody>
            </Table>
        </>
    );
}