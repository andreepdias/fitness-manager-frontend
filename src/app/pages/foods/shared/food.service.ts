import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { Food } from './food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService extends BaseResourceService<Food> {

  constructor(
    protected injector: Injector
  ) {
    super(injector, 'foods', Food.fromJson);
  }
}
