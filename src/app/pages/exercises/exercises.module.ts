import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesListComponent } from './exercises-list/exercises-list.component';
import { SharedModule } from "../../shared/shared.module";
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';


@NgModule({
  declarations: [ExercisesListComponent, ExerciseFormComponent],
  imports: [
    CommonModule,
    ExercisesRoutingModule,
    SharedModule
  ]
})
export class ExercisesModule { }
