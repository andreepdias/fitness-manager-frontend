import { User } from "../../authentication/user.model";

export class MealName {
    id: number = 0;
    orderNumber: number = 0;
    name: string = '';
    user: User = new User('', '', '');
}