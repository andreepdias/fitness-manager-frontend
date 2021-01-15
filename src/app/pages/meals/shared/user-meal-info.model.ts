import { User } from "../../authentication/user.model";
import { MealName } from "./meal-name.model";

export class UserMealInfo {
    id: number = 0;
    mealsPerDay: string = '';
    user: User = new User('', '', '');
    mealsName: MealName[] = [];

    static fromJSON(json: any){
        return Object.assign(new UserMealInfo(), json);
    }

}