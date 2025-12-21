//import axios from "axios";

export const fetchIngredients = async () => {
    //await new Promise((resolve) => setTimeout(resolve, 2000))
    const endPoint = "/ingredient/list";
    const url = `${process.env.REACT_APP_BACKEND_URL}${endPoint}`;
    const response = await fetch(url);
    return await response.json();

    /*const response = await axios.get(url);
    return response.data;*/
}