import axios from "axios";

class RequestHandler {

    constructor() {
        this.url = process.env.REACT_APP_BACKEND_URL;
    }

    getAllRecipes() {
        const endPoint = "/recipe/list";
        return axios.get(this.url + endPoint);
    }

    getAllIngredients() {
        const endPoint = "/ingredient/list";
        return axios.get(this.url + endPoint);
    }

    getRecipe(recipeId) {
        const endPoint = "/recipe/get";
        return axios.get(this.url + endPoint, {
            params: {
                id: recipeId
            }
        });
    }

    addNewRecipe(recipe) {
        const endPoint = "/recipe/create";
        return axios.post(this.url + endPoint, recipe, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    updateRecipe(recipe) {
        const endPoint = "/recipe/update";
        return axios.post(this.url + endPoint, recipe, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    deleteRecipe(recipeId) {
        const endPoint = "/recipe/delete";
        return axios.post(this.url + endPoint, recipeId, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
}
const requestHandler = new RequestHandler();
export default requestHandler;