import Table from 'react-bootstrap/Table';
import ModifyRecipeButtons from "./ModifyRecipeButtons";
import * as strings from "../text/strings";
import {useContext} from "react";
import UserContext from "../context/UserProvider";

export default function RecipesTableList({recipes}) {
    const { isAuthorized } = useContext(UserContext);

    return (
        <>
            <div className="m-3">
                <Table responsive striped bordered>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>{strings.TABLE_NAME}</th>
                        <th>{strings.TABLE_DESCRIPTION}</th>
                        {isAuthorized &&
                            <th>{strings.TABLE_ACTION}</th>
                        }
                    </tr>
                    </thead>
                    <tbody>
                        {recipes && recipes.map((recipe, index) => (
                            <tr key={recipe.id} className="align-middle">
                                <td>{index + 1}</td>
                                <td>{recipe.name}</td>
                                <td>{recipe.description}</td>
                                {isAuthorized &&
                                    <td >
                                        <ModifyRecipeButtons recipe={recipe}/>
                                    </td>
                                }
                            </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}