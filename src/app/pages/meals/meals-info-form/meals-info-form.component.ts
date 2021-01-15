import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { UserMealInfoService } from '../shared/meal-info.service';
import { MealName } from '../shared/meal-name.model';
import { SelectedDateService } from '../shared/selected-date.service';
import { UserMealInfo } from '../shared/user-meal-info.model';

@Component({
  selector: 'app-meals-info-form',
  templateUrl: './meals-info-form.component.html',
  styleUrls: ['./meals-info-form.component.css']
})
export class UserMealsInfoFormComponent extends BaseResourceFormComponent<UserMealInfo> implements OnInit {

  selectedDate: Date = new Date();

  imaskConfig: any = {
    mask: Number,
    scale: 0,
    housandsSeparator: '',
    padFractionalZeros: false,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    protected injector: Injector,
    protected service: UserMealInfoService,
    private dateService: SelectedDateService
  ) {
    super(injector, service, new UserMealInfo(), UserMealInfo.fromJSON);
  }

  ngOnInit(){
    this.selectedDate = this.dateService.selectedDate;
    super.ngOnInit();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      id: [ null ],
      mealsPerDay: [ null, Validators.required ],
      mealsName: [ [], Validators.required ],
      shouldUpdateSelectedDate: [ false ],
    })
  }
  
  setPageTitle(){
    this.pageTitle = 'Editing yor meals names';
  }

  changeMealName(event: any, mealName: MealName){
    mealName.name = event.target.value;
  }

  addNewMealName(){
    const indexLastMeal = this.resource.mealsName.length;
    const newMealName = new MealName();
    newMealName.orderNumber = indexLastMeal + 1;
    newMealName.name = 'New meal';

    this.resource.mealsName.push(newMealName);
  }

  removeMealName(mealName: MealName){
    const mealIndex = this.resource.mealsName.indexOf(mealName);
    this.resource.mealsName.splice(mealIndex, 1);

    for(let i = 1; i <= this.resource.mealsName.length; i++){
      this.resource.mealsName[i - 1].orderNumber = i;
    }
  }

  onSubmitForm(){
    this.form.value.mealsName = this.resource.mealsName;
    this.form.value.mealsPerDay = this.resource.mealsName.length;
    this.updateResource();
  }
    
  updateResource(){
    
    const resource = this.jsonToResourceFn(this.form.value);

    console.log(this.form.value.shouldUpdateSelectedDate);

    if(this.form.value.shouldUpdateSelectedDate){
      this.service.updateWithDate(resource, this.selectedDate).subscribe(
        success => this.actionsForSuccess(success),
        error => this.actionsForFailure(error)
      );      
    }else{
      this.service.update(resource).subscribe(
        success => this.actionsForSuccess(success),
        error => this.actionsForFailure(error)
      );      
    }
  }

  actionsForSuccess(success: any){
    this.toastr.success('Your daily meal names were successfully updated.', 'Success');
    this.navigateToParent();
  }

}
