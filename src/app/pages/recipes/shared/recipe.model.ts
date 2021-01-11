import { Food } from "../../foods/shared/food.model";
import { Ingredient } from "./ingredient.model";

export class Recipe{
    id: number = 0;
    name: string = '';
    ingredients: Ingredient[] = [];

    static getCarbs(recipe: Recipe){
        if(recipe.ingredients){
            return recipe.ingredients.map(x => parseFloat(x.food.carbohydrates)).reduce((a, b) => a + b);
        }
        return 0.0;
    }

    static getProteins(recipe: Recipe){
        if(recipe.ingredients){
            return recipe.ingredients.map(x => parseFloat(x.food.proteins)).reduce((a, b) => a + b);
        }
        return 0.0;
    }

    static getFats(recipe: Recipe){
        if(recipe.ingredients){
            return recipe.ingredients.map(x => parseFloat(x.food.fats)).reduce((a, b) => a + b);
        }
        return 0.0;
    }
    

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