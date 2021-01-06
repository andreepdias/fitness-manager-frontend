import { Food } from "../../foods/shared/food.model";
import { Ingredient } from "./ingredient.model";

export class Recipe{
    id?: number = 0;
    name: string = '';
    ingredients: Ingredient[] = [];

    static fromJSON(json: any){

        let recipe = Object.assign(new Recipe(), json);
        recipe.ingredients = [];

        json.ingredients.forEach((ingredient: any) => ingredient.food = Object.assign(new Food(), ingredient.food) ) ;

        for(let ingredient of json.ingredients){
            ingredient = Object.assign(new Ingredient(), ingredient);
            recipe.ingredients.push(ingredient);
        }
        return recipe;
    }
}