import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyMeal } from '../../meals/shared/daily-meal.model';
import { MacrosCount } from '../../meals/shared/macros-count.model';
import { UserMealInfoService } from '../../meals/shared/meal-info.service';
import { MealService } from '../../meals/shared/meal.service';
import { UserMealInfo } from '../../meals/shared/user-meal-info.model';
import { RoutineService } from '../../routines/shared/routine.service';
import { TrainingRoutine } from '../../routines/shared/training-routine.model';
import { TrainingSession } from '../../routines/shared/training-session.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imaskConfig: any = {
    mask: Number,
    scale: 3,
    thousandsSeparator: '',
    padFractionalZeros: false,
    normalizeZeros: true,
    radix: ','
  };

  activeTrainingRoutine: TrainingRoutine = new TrainingRoutine();
  userMealInfo: UserMealInfo = new UserMealInfo();
  todaysDailyMeal: DailyMeal = new DailyMeal();

  currentTrainingSession: TrainingSession = new TrainingSession();
  macrosGoal: MacrosCount = new MacrosCount();
  macrosCurrent: MacrosCount = new MacrosCount();

  formDiet: FormGroup = new FormGroup({});
  displayModalDiet: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private routineService: RoutineService,
    private userMealInfoService: UserMealInfoService,
    private dailyMealService: MealService
  ) { }

  /** INIAL SETUP RELATED METHODS */

  ngOnInit(): void {
    this.loadActiveTrainingRoutine();
    this.loadUserMealInfo();
    this.loadTodaysDailyMeal();
    this.buildFormDiet();
  }

  loadActiveTrainingRoutine(){
    this.routineService.getActiveTrainingRoutine().subscribe(
      success => this.successLoadTrainingRoutine(success),
      error => console.log('Error loading active training routine: ', error)
    );
  }

  successLoadTrainingRoutine(success: any){
    this.activeTrainingRoutine = success;

    if(this.activeTrainingRoutine.id){
      const isCurrentRoutineList = this.activeTrainingRoutine.trainingSessions.filter(x => x.isCurrentSession == true);
      if(isCurrentRoutineList.length > 0){
        this.currentTrainingSession = isCurrentRoutineList[0];
      }
    }

  }

  loadUserMealInfo(){
    this.userMealInfoService.loadActiveUserMealInfo().subscribe(
      success => this.successLoadUserMealInfo(success),
      error => console.log('Error loading user meal info: ', error)
    );
  }

  successLoadUserMealInfo(success: any){
    this.userMealInfo = success;
    this.macrosGoal = this.userMealInfo.macrosGoal;
    this.formDiet.patchValue(this.macrosGoal);
  }

  loadTodaysDailyMeal(){
    const today = new Date();
    this.dailyMealService.getByDate(today.getDate(), today.getMonth() + 1, today.getFullYear()).subscribe(
      success => this.successLoadTodaysDailyMeal(success),
      error => console.log('Error loading todays daily meal')
    )
  }

  successLoadTodaysDailyMeal(success: any){
    this.todaysDailyMeal = success;
    this.macrosCurrent = this.todaysDailyMeal.macrosCount;
  }

  buildFormDiet(){
    this.formDiet = this.formBuilder.group({
      id: [ null ],
      caloriesCount: [ null, [ Validators.required ] ],
      carbsCount: [ null, [ Validators.required ] ],
      proteinsCount: [ null, [ Validators.required ] ],
      fatsCount: [ null, [ Validators.required ] ]
    });
  }

  /** DISPLAY MACROS PERCENTAGE */

  get caloriesPercent(){
    return 'width: ' + String(((parseFloat(this.macrosCurrent.caloriesCount) / parseFloat(this.macrosGoal.caloriesCount)) * 100.0)) + '%;';
  }

  get carbsPercent(){
    return 'width: ' + String(((parseFloat(this.macrosCurrent.carbsCount) / parseFloat(this.macrosGoal.carbsCount)) * 100.0)) + '%;';
  }

  get proteinsPercent(){
    return 'width: ' + String(((parseFloat(this.macrosCurrent.proteinsCount) / parseFloat(this.macrosGoal.proteinsCount)) * 100.0)) + '%;';
  }

  get fatsPercent(){
    return 'width: ' + String(((parseFloat(this.macrosCurrent.fatsCount) / parseFloat(this.macrosGoal.fatsCount)) * 100.0)) + '%;';
  }

  /** MODAL EDIT DIET GOLAS RELATED METHODS */

  showModalDiet(){
    this.displayModalDiet = true;
  }

  submitFormDiet(){

    this.formDiet.value.caloriesCount = this.unformatValue(this.formDiet.value.caloriesCount);
    this.formDiet.value.carbsCount = this.unformatValue(this.formDiet.value.carbsCount);
    this.formDiet.value.proteinsCount = this.unformatValue(this.formDiet.value.proteinsCount);
    this.formDiet.value.fatsCount = this.unformatValue(this.formDiet.value.fatsCount);

    const macroGoals = Object.assign(new MacrosCount, this.formDiet.value);

    this.updateMacroGoals(macroGoals);
  }

  updateMacroGoals(macroGoals: MacrosCount){
    this.userMealInfoService.updateMacroGoals(macroGoals).subscribe(
      success => this.successUpdateMacrosGoals(success),
      error => console.log('Error updating macros goals: ', error)
    );
  }

  unformatValue(value: any){
    return value.replace(',', '.');
  }

  successUpdateMacrosGoals(success: any){
    this.macrosGoal = success;
    this.displayModalDiet = false;
  }

  /** TRAINING METHODS */

  nextTrainingSession(){
    this.routineService.updateCurrentTrainingSession(this.currentTrainingSession).subscribe(
      success => this.currentTrainingSession = success,
      error => console.log('Error updating current training session: ', error)
    );
  }

}
