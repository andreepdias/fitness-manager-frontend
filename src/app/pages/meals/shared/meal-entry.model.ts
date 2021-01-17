import { Pipe, PipeTransform } from "@angular/core";
import { Food } from "../../foods/shared/food.model";
import { Recipe } from "../../recipes/shared/recipe.model";
import { MacrosCount } from "./macros-count.model";

export class MealEntry {
    id: number = 0;
    mealId: number = 0;
    quantity: string = '';
    food?: Food;
    recipe?: Recipe;
    macrosCount: MacrosCount = new MacrosCount();
    dailyMealId: number = 0;

    static getUnit(entry: MealEntry){
        if(entry.food){
            return entry.food.unit;
        }
        if(entry.recipe){
            return entry.recipe.unit;
        }
        return '';
    }

    static getCarbs(entry: MealEntry){
        if(entry.food){
            return Food.getCarbs(entry.food) * parseFloat(entry.quantity);
        }
        if(entry.recipe){
            return Recipe.getCarbs(entry.recipe) * parseFloat(entry.quantity);
        }
        return 0;
    }

    static getProteins(entry: MealEntry){
        if(entry.food){
            return Food.getProteins(entry.food) * parseFloat(entry.quantity);
        }
        if(entry.recipe){
            return Recipe.getProteins(entry.recipe) * parseFloat(entry.quantity);
        }
        return 0;
    }    

    static getFats(entry: MealEntry){
        if(entry.food){
            return Food.getFats(entry.food) * parseFloat(entry.quantity);
        }
        if(entry.recipe){
            return Recipe.getFats(entry.recipe) * parseFloat(entry.quantity);
        }
        return 0;
    }    

    static getCalories(entry: MealEntry){
        if(entry.food){
            return Food.getCalories(entry.food) * parseFloat(entry.quantity);
        }
        if(entry.recipe){
            return Recipe.getCalories(entry.recipe) * parseFloat(entry.quantity);
        }
        return 0;
    }


    static fromJSON(json: any){
        return Object.assign(new MealEntry(), json);
    }
}