import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Food } from '../../foods/shared/food.model';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from '../shared/recipe.model';
import { RecipesService } from '../shared/recipes.service';

@Component({
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.css']
})
export class RecipesFormComponent extends BaseResourceFormComponent<Recipe> implements OnInit {

  foods: Food[] = [];

  units: any;

  constructor(
    protected injector: Injector,
    protected service: RecipesService
  ) {
    super(injector, service, new Recipe(), Recipe.fromJSON);
    this.units = Recipe.units;
  }

  ngOnInit(){
    super.ngOnInit();
    this.loadFoods();
    this.form.controls.unit.setValue(this.units[2].name);
  }


  buildForm(){
    this.form = this.formBuilder.group({
      id: [ null ],
      name: [ null, [ Validators.required ] ],
      foodsSelected: [ [], [ Validators.required ] ],
      serving: [ null, [ Validators.required ] ],
      unit: [ null, [ Validators.required ] ],
      ingredients: [ [], [ Validators.required ] ],
    });
  }

  setPageTitle(){
    if(this.currentAction == 'new'){
      this.pageTitle = 'Creating new Recipe';
    }else{
      this.pageTitle = 'Editing ' + (this.resource.name);
    }
  }

  loadFoods(){
    this.service.getAllFoods().subscribe(
      success => this.actionsForSuccessLoadFoods(success),
      error => this.actionsForFailure(error)
    );
  }

  actionsForSuccessLoadFoods(success: any){
    this.foods = success;
  }

  actionsForFailure(error: any){
    console.log('Error loading foods: ', error);
  }

  selectIngredient(event: any){
    const choosenFoodsSet = new Set<number>(event.value);

    this.resource.ingredients = this.resource.ingredients.filter((x: any) => choosenFoodsSet.has(x.food.id));
    const ingredientsFoodsSet = new Set<number>(this.resource.ingredients.map((ingredient: any) => ingredient.food.id));

    const toAddSet = new Set([...choosenFoodsSet].filter(x => !ingredientsFoodsSet.has(x) ));

    for(let foodId of toAddSet){
      const food = this.foods.filter(food => food.id == foodId)[0];
      
      const ingredient = new Ingredient();      
      ingredient.food = Object.assign(new Food(), food);
      ingredient.quantity = food.serving;

      this.resource.ingredients.push(ingredient);
    }
  }

  changeQuantity(event: any){
    let newValue = this.unformatMask(event.target.value);
    newValue = this.setOnlyDigits(newValue);
    newValue = this.fixPrecision(newValue, 3);

    const foodId = event.target.id;    
    const food = this.foods.filter(x => x.id == foodId)[0];
    const foodServing = parseFloat(food.serving);    
    
    const ingredient = this.resource.ingredients.filter((x: any) => x.food.id == foodId)[0];
    
    const newServing = parseFloat(newValue);    
    const newCarbs = (parseFloat(food.carbohydrates) / foodServing) * newServing;
    const newProteins = (parseFloat(food.proteins) / foodServing) * newServing;
    const newFats = (parseFloat(food.fats) / foodServing) * newServing;
    const newCalories = (parseFloat(food.calories) / foodServing) * newServing;
    
    ingredient.quantity = newValue;
    ingredient.food.carbohydrates = String(newCarbs);
    ingredient.food.proteins = String(newProteins);
    ingredient.food.fats = String(newFats);
    ingredient.food.calories = String(newCalories);
    console.log(this.resource.ingredients);
  }

  onSubmitForm(){
    this.form.value.ingredients = this.resource.ingredients;
    super.onSubmitForm();
  }

  actionsForSuccessLoad(success: any){
    super.actionsForSuccessLoad(success);
    const foodsIdFromIngredients = this.resource.ingredients.map(x => x.food.id);
    this.form.controls.foodsSelected.setValue(foodsIdFromIngredients);
  }

  getIngredientCarbs(ingredient: Ingredient){
    return String(Food.getCarbs(ingredient.food) * parseFloat(ingredient.quantity));
  }

  getIngredientProteins(ingredient: Ingredient){
    return String(Food.getProteins(ingredient.food) * parseFloat(ingredient.quantity));
  }

  getIngredientFats(ingredient: Ingredient){
    return String(Food.getFats(ingredient.food) * parseFloat(ingredient.quantity));
  }

  getIngredientCalories(ingredient: Ingredient){
    return String(Food.getCalories(ingredient.food) * parseFloat(ingredient.quantity));
  }
}
