import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { fetchRecipe, fetchRecipes } from "../api/recipesRequests";
import { fetchIngredients } from "../api/ingredientsRequest";

export const getAllRecipesQueryOptions = () => {
    return queryOptions({
        queryKey: queryKeys.recipes,
        queryFn: fetchRecipes
    })
}

export const getRecipeDetailQueryOptions = (id) => {
    return queryOptions({
        queryKey: queryKeys.recipe(id),
        queryFn: fetchRecipe,
        enabled: !!id,
    })
}

export const getAllIngredientsQueryOptions = () => {
    return queryOptions({
        queryKey: queryKeys.ingredients,
        queryFn: fetchIngredients,
        select: (data) => {
            return data.sort((a, b) => a.name.localeCompare(b.name))
        }
    })
}
