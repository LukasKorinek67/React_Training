import axios from "axios";

class RequestHandler {

    constructor() {
        this.url = "http://localhost:8000";
    }

    getAllRecipes() {
        const endPoint = "/recipe/list";
        return axios.get(this.url + endPoint);
    }

    getAllIngredients() {
        const endPoint = "/ingredient/list";
        return axios.get(this.url + endPoint);
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