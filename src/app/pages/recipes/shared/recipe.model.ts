import { Food } from "../../foods/shared/food.model";
import { Ingredient } from "./ingredient.model";

export class Recipe{
    id: number = 0;
    name: string = '';
    serving: string = '';
    unit: string = '';
    ingredients: Ingredient[] = [];


    static get units(){
        return [
            { name: 'g' },
            { name: 'ml' },
            { name: 'un.' }
        ];
    }

    static getCarbs(recipe: Recipe){
        if(recipe.ingredients){
            return recipe.ingredients.map(x => Food.getCarbs(x.food) * parseFloat(x.quantity) ).reduce((a, b) => a + b) / parseFloat(recipe.serving);
        }
        return 0.0;
    }

    static getProteins(recipe: Recipe){
        if(recipe.ingredients){
            return recipe.ingredients.map(x => Food.getProteins(x.food) * parseFloat(x.quantity) ).reduce((a, b) => a + b) / parseFloat(recipe.serving);
        }
        return 0.0;
    }

    static getFats(recipe: Recipe){
        if(recipe.ingredients){
            return recipe.ingredients.map(x => Food.getFats(x.food) * parseFloat(x.quantity) ).reduce((a, b) => a + b) / parseFloat(recipe.serving);
        }
        return 0.0;
    }

    static getCalories(recipe: Recipe){
        if(recipe.ingredients){
            return recipe.ingredients.map(x => Food.getCalories(x.food) * parseFloat(x.quantity) ).reduce((a, b) => a + b) / parseFloat(recipe.serving);
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