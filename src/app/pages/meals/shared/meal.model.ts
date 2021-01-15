import { MealEntry } from "./meal-entry.model";
import { MealName } from "./meal-name.model";

export class Meal {
    id: number = 0;
    mealName: string = '';
    orderNumber: number = 0;
    mealEntries: MealEntry[] = [];
}