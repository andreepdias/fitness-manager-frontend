import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealsRoutingModule } from './meals-routing.module';
import { MealsComponent } from './meals/meals.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserMealsInfoFormComponent } from './meals-info-form/meals-info-form.component';
import { SelectedDateService } from './shared/selected-date.service';


@NgModule({
  declarations: [MealsComponent, UserMealsInfoFormComponent],
  imports: [
    CommonModule,
    MealsRoutingModule,
    SharedModule
  ],
  providers: [
    SelectedDateService
  ]
})
export class MealsModule { }
