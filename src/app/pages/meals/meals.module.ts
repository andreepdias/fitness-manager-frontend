import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealsRoutingModule } from './meals-routing.module';
import { MealsComponent } from './meals/meals.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MealsComponent],
  imports: [
    CommonModule,
    MealsRoutingModule,
    SharedModule
  ]
})
export class MealsModule { }
