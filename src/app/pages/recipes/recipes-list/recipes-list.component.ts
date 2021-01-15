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
  
  imaskConfig: any = {
    mask: Number,
    scale: 3,
    thousandsSeparator: '',
    padFractionalZeros: false,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    protected injector: Injector,
    protected service: RecipesService
  ) {
    super(injector, service);
  }

  getCarbs(recipe: Recipe){
    const value = Recipe.getCarbs(recipe) * parseFloat(recipe.serving);
    return String(value);
  }

  getProteins(recipe: Recipe){
    const value = Recipe.getProteins(recipe) * parseFloat(recipe.serving);
    return String(value);
  }

  getFats(recipe: Recipe){
    const value = Recipe.getFats(recipe) * parseFloat(recipe.serving);
    return String(value);
  }

  getCalories(recipe: Recipe){
    const value = Recipe.getCalories(recipe) * parseFloat(recipe.serving);
    return String(value);
  }

}
