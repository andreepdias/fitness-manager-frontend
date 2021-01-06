import { Injectable, Injector } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { environment } from 'src/environments/environment';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService extends BaseResourceService<Recipe>{

  apiURLBase: string = environment.apiURLBase;

  constructor(
    protected injector: Injector
  ) {
    super(injector, 'recipes', Recipe.fromJSON );
  }

  getAllFoods(){
    return this.http.get(`${this.apiURLBase}/foods/all`).pipe(
      catchError(this.handleError),
      map(this.jsonToResources.bind(this))
    );
  }
}
