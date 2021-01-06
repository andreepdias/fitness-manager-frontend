import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Recipe } from '../shared/recipe.model';
import { RecipesService } from '../shared/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent extends BaseResourceListComponent<Recipe> implements OnInit {

  constructor(
    protected injector: Injector,
    protected service: RecipesService
  ) {
    super(injector, service);
  }

}
