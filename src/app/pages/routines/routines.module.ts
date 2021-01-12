import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutinesRoutingModule } from './routines-routing.module';
import { RoutinesComponent } from './routines/routines.component';
import { SharedModule } from "../../shared/shared.module";
import { RoutinesListComponent } from './routines-list/routines-list.component';
import { RoutinesFormComponent } from './routines-form/routines-form.component';


@NgModule({
  declarations: [RoutinesComponent, RoutinesListComponent, RoutinesFormComponent],
  imports: [
    CommonModule,
    RoutinesRoutingModule,
    SharedModule
  ]
})
export class RoutinesModule { }
