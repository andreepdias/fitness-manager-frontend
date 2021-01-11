import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesListComponent } from './exercises-list/exercises-list.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [ExercisesListComponent],
  imports: [
    CommonModule,
    ExercisesRoutingModule,
    SharedModule
  ]
})
export class ExercisesModule { }
