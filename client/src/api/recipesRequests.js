import axios from "axios";

export const fetchRecipes = async () => {
    //await new Promise((resolve) => setTimeout(resolve, 2000))
    const endPoint = "/recipe/list";
    const url = process.env.REACT_APP_BACKEND_URL + endPoint;
    const response = await fetch(url);
    return await response.json();
}

export const fetchRecipe = async ({ queryKey }) => {
    //await new Promise((resolve) => setTimeout(resolve, 2000))
    const [, recipeId] = queryKey;
    const params = new URLSearchParams({ id: recipeId });
    const endPoint = "/recipe/get";
    const url = `${process.env.REACT_APP_BACKEND_URL}${endPoint}?${params.toString()}`;
    const response = await fetch(url, );
    return await response.json();

    /*const url = `${process.env.REACT_APP_BACKEND_URL}${endPoint}`;
    const params = {
        params: { id: recipeId },
    };
    const response = await axios.get(url, params);
    return response.data;*/
}

export const addNewRecipe = async (recipe) => {
    const endPoint = "/recipe/create";
    const url = `${process.env.REACT_APP_BACKEND_URL}${endPoint}`;
    return axios.post(url, recipe, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

export const updateRecipe = async (recipe) => {
    const endPoint = "/recipe/update";
    const url = `${process.env.REACT_APP_BACKEND_URL}${endPoint}`;
    return axios.post(url, recipe, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

export const deleteRecipe = async (recipeId) => {
    const endPoint = "/recipe/delete";
    const url = `${process.env.REACT_APP_BACKEND_URL}${endPoint}`;
    return axios.post(url, recipeId, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
