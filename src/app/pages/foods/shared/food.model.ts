export class Food {
    id: number = 0;
    name: string = '';
    serving: string = '';
    unit: string = '';
    carbohydrates: string = '';
    proteins: string = '';
    fats: string = '';
    calories: string = '';


    static get units(){
        return [
            { name: 'g' },
            { name: 'ml' },
            { name: 'un.' }
        ];
    }


    static getCarbs(food: Food){
        return parseFloat(food.carbohydrates) / parseFloat(food.serving);
    }

    static getProteins(food: Food){
        return parseFloat(food.proteins) / parseFloat(food.serving);
    }

    static getFats(food: Food){
        return parseFloat(food.fats) / parseFloat(food.serving);
    }

    static getCalories(food: Food){
        return parseFloat(food.calories) / parseFloat(food.serving);
    }
    

    static fromJson(json: any){
        return Object.assign(new Food(), json);
    }

}