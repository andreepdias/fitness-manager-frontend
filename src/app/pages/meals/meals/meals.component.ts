import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Food } from '../../foods/shared/food.model';
import { Recipe } from '../../recipes/shared/recipe.model';
import { RecipesService } from '../../recipes/shared/recipes.service';
import { DailyMeal } from '../shared/daily-meal.model';
import { MealEntry } from '../shared/meal-entry.model';
import { MealService } from '../shared/meal.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  date: Date = new Date();
  todayDate: Date = new Date();

  dailyMeal: DailyMeal = new DailyMeal();

  foods: Food[] = [];
  recipes: Recipe[] = [];

  modalForm: FormGroup = new FormGroup({});
  displayModalMeal: boolean = false;
  modalCurrentAction: string = '';
  tabIndexSelected: number = 0;
  
  displayModalDate: boolean = false;
  selectedModalDate: Date = new Date();

  imaskConfig: any = {
    mask: Number,
    scale: 3,
    thousandsSeparator: '',
    padFractionalZeros: false,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    private service: MealService,
    private recipeService: RecipesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  /** INITIAL SETUP RELATED */

  ngOnInit(): void {
    this.buildModalForm();
    this.loadTodaysMeal();
    this.loadFoods();
    this.loadRecipes();
  }

  buildModalForm(){
    this.modalForm = this.formBuilder.group({
      id: [ null ],
      mealId: [ null ],
      quantity: [ null, [ Validators.required ] ],
      food: [ null ],
      recipe: [ null ]
    })
  }

  /** REST RELATED METHODS */

  loadTodaysMeal(){
    this.loadMeal(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
  }

  loadMeal(day: number, month: number, year: number){
    this.service.getByDate(day, month, year).subscribe(
      success => this.actionsForSuccessLoadMeal(success),
      error => this.actionsForErrorLoadMeal(error),
    );
  }

  loadFoods(){
    this.recipeService.getAllFoods().subscribe(
      success => this.actionsForSuccessLoadFoods(success),
      error => this.actionsForErrorLoadFoods(error),
    )
  }

  loadRecipes(){
    this.recipeService.getAll().subscribe(
      success => this.actionsForSuccessLoadRecipes(success),
      error => this.actionsForErrorLoadRecipes(error),
    )
  }

  deleteMealEntry(entry: MealEntry){
    this.service.deleteEntry(entry).subscribe(
      success => this.actionsForSuccessDeleteEntry(success),
      error => this.actionsForErrorDeleteEntry(error),
    )
  }

  createDailyMeal(){
    this.service.createDailyMeal(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear()).subscribe(
      success => this.actionsForSuccessCreateDailyMeal(success),
      error => this.actionsForErrorCreateDailyMeal(error)
    );
  }

  /** CHOOSE DATE METHODS */

  choosePreviousDay(){
    this.date.setDate(this.date.getDate() - 1);
    this.loadMeal(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
  }

  chooseNextDay(){
    this.date.setDate(this.date.getDate() + 1);
    this.loadMeal(this.date.getDate(), this.date.getMonth() + 1, this.date.getFullYear());
  }

  isTodaySelected(){
    return this.date.getDate() == this.todayDate.getDate() && this.date.getMonth() == this.todayDate.getMonth() && this.date.getFullYear() == this.todayDate.getFullYear();
  }

  /** HANDLE RESPONSE METHODS */

  // LOAD MEAL
  actionsForSuccessLoadMeal(success: any){
    this.dailyMeal = success;
  }

  actionsForErrorLoadMeal(error: any){
    console.log('Error loading meal: ', error);
  }

  // LOAD FOODS
  actionsForSuccessLoadFoods(success: any){
    this.foods = success;
  }
  
  actionsForErrorLoadFoods(error: any){
    console.log('Error loading foods: ', error);
  }

  // LOAD RECIPES
  actionsForSuccessLoadRecipes(success: any){
    this.recipes = success;
  }
  
  actionsForErrorLoadRecipes(error: any){
    console.log('Error loading recipes: ', error);
  }

  // DELETE ENTRY
  actionsForSuccessDeleteEntry(success: any){
    const message = (success.food ? success.food.name : success.recipe.name) + ' was successfully deleted.';
    this.toastr.success('Success', message);

    const meal = this.dailyMeal.meals.filter(x => x.id == success.mealId)[0];
    const entry = meal.mealEntries.filter(x => x.id == success.id)[0];
    const index = meal.mealEntries.indexOf(entry);
    meal.mealEntries.splice(index, 1);
    
  }
  
  actionsForErrorDeleteEntry(error: any){
    error.error.errors.forEach((message: string) => {
      this.toastr.error(message, 'Deletion failed');
    });
  }

  actionsForSuccessCreateDailyMeal(success: any){
    this.dailyMeal = success;
  }

  actionsForErrorCreateDailyMeal(error: any){
    console.log('Error creating daily meal: ', error);
  }

  
  /** VIEW UTIL METHODS  */

  getEntryCarbs(entry: MealEntry){
    return String(MealEntry.getCarbs(entry));
  }

  getEntryProteins(entry: MealEntry){
    return String(MealEntry.getProteins(entry));
  }

  getEntryFats(entry: MealEntry){
    return String(MealEntry.getFats(entry));
  }
  
  /** MODAL PICK DATE RELATED METHODS */
  showModalDate() {
    this.displayModalDate = true;
  }

  selectDate(event: any){
    this.displayModalDate = false;
    this.loadMeal(event.getDate(), event.getMonth() + 1, event.getFullYear());
  }

  /** MODAL CREATE/EDIT RELATED METHODS */

  /** INITIAL SETUP */

  showModalMeal(event: any, action: string) {
    this.selectTab(event);
    this.displayModalMeal = true;
    this.modalCurrentAction = action;
    this.loadEntryValues(event);
  }

  selectTab(event: any){
    if(event.recipe){
      this.tabIndexSelected = 1;
    }else{
      this.tabIndexSelected = 0;
    }
  }

  loadEntryValues(event: any){
    if(this.modalCurrentAction == 'edit'){
      this.modalForm.patchValue(event);
    }else{
      this.modalForm.controls.mealId.setValue(event.id);
    }

    if(this.foods.length > 0 && !this.modalForm.value.food)  this.modalForm.controls.food.setValue(this.foods[0]);
    if(this.recipes.length > 0 && !this.modalForm.value.recipe) this.modalForm.controls.recipe.setValue(this.recipes[0]);
  }

  /** SUBMIT FORM */

  onSubmitModalForm(){
    if(this.modalCurrentAction == 'new'){
      this.createEntry();
    }else{
      this.updateEntry();
    }
  }

  createEntry(){
    const entry = MealEntry.fromJSON(this.modalForm.value);
    this.fixEntry(entry);
    this.service.createEntry(entry).subscribe(
      success => this.actionsForSuccess(success),
      error => this.actionsForError(error)
      );
    }
    
    updateEntry(){
      const entry = MealEntry.fromJSON(this.modalForm.value);
      this.fixEntry(entry);
      this.service.updateEntry(entry).subscribe(
      success => this.actionsForSuccess(success),
      error => this.actionsForError(error)
    );
  }

  fixEntry(entry: MealEntry){
    if(this.tabIndexSelected == 0){
      entry.recipe = undefined;
    }else{
      entry.food = undefined;
    }
  }

  /** HANDLE RESPONSE */

  actionsForSuccess(success: any){
    console.log(success);
    this.showSuccessToastr(success.food ? success.food.name : success.recipe.name);
    const meal = this.dailyMeal.meals.filter(x => x.id == success.mealId)[0];

    if(this.modalCurrentAction == 'new'){
      meal.mealEntries.push(success);
    }else{
      const entry = meal.mealEntries.filter(x => x.id == success.id)[0];
      const index = meal.mealEntries.indexOf(entry);
      meal.mealEntries[index] = success;
    }
    this.displayModalMeal = false;
  }

  actionsForError(error: any){
    this.showErrorToastr(error);
  }

  showSuccessToastr(name: string){
    const operation = this.modalCurrentAction == 'new' ? 'added' : 'edited';
    const message = name + ' was successfully ' + operation + '.';
    this.toastr.success('Success', message);
  }
  
  showErrorToastr(error: any){
    const operation = this.modalCurrentAction == 'new' ? 'Adition' : 'Edition';
    error.error.errors.forEach((message: string) => {
      this.toastr.error(message, operation + ' failed');
    });
  }



}
