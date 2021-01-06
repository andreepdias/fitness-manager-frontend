import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Food } from '../shared/food.model';
import { FoodService } from '../shared/food.service';

@Component({
  selector: 'app-foods-list',
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.css'],
})
export class FoodsListComponent extends BaseResourceListComponent<Food> implements OnInit {

  constructor(
    protected injector: Injector,
    protected service: FoodService
  ) {
    super(injector, service);
  }

}
