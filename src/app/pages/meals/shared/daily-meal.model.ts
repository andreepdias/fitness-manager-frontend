import { User } from "../../authentication/user.model";
import { MacrosCount } from "./macros-count.model";
import { Meal } from "./meal.model";

export class DailyMeal {
    id: number = 0;
    date: string = '';
    user: User = new User('', '', '');
    meals: Meal[] = [];
    macrosCount: MacrosCount = new MacrosCount();

    static fromJSON(json: any){
        return Object.assign(new DailyMeal(), json);
    }
}