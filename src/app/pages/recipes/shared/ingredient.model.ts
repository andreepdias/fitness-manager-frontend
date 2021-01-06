import { Food } from "../../foods/shared/food.model";

export class Ingredient{
    id: number = 0;
    quantity: string = '';
    food: Food = new Food();

    static fromJSON(json: any){
        return Object.assign(new Ingredient(), json);
    }
}