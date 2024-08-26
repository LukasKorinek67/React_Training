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
        //const endPoint = "recipe/create";
        console.log(recipe);
    }
}
const requestHandler = new RequestHandler();
export default requestHandler;