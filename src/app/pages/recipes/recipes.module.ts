import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesFormComponent } from './recipes-form/recipes-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RecipesListComponent, RecipesFormComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule { }
