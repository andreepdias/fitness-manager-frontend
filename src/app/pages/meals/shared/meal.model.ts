import { MealEntry } from "./meal-entry.model";
import { MealName } from "./meal-name.model";

export class Meal {
    id: number = 0;
    mealName: MealName = new MealName();
    mealEntries: MealEntry[] = [];
}