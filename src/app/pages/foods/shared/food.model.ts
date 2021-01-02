import { BaseResourceModel } from "src/app/shared/model/base-resource.model";

export class Food {
    id: number = 0;
    name: string = '';
    serving: number = 0;
    carbohydrates: number = 0;
    proteins: number = 0;
    fats: number = 0;

    static fromJson(json: any){
        return Object.assign(new Food(), json);
    }

}