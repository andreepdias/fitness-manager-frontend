import { BaseResourceModel } from "src/app/shared/model/base-resource.model";

export class Food {
    id: number = 0;
    name: string = '';
    serving: string = '';
    carbohydrates: string = '';
    proteins: string = '';
    fats: string = '';

    static fromJson(json: any){
        return Object.assign(new Food(), json);
    }

}