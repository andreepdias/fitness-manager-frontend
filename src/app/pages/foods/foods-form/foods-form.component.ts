import { Component, Injector, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Food } from '../shared/food.model';
import { FoodService } from '../shared/food.service';

@Component({
  selector: 'app-foods-form',
  templateUrl: './foods-form.component.html',
  styleUrls: ['./foods-form.component.css']
})
export class FoodsFormComponent extends BaseResourceFormComponent<Food> implements OnInit {
  
  units: any = [];

  constructor(
    protected injector: Injector,
    protected service: FoodService,
  ) {
    super(injector, service, new Food(), Food.fromJson);

    this.units = Food.units;
  }

  buildForm(){
    this.form = this.formBuilder.group({
      id: [ null ],
      name: [ null, [ Validators.required ] ],
      serving: [ null, [ Validators.required ] ],
      unit: [ null, [ Validators.required ] ],
      carbohydrates: [ null, [ Validators.required ] ],
      proteins: [ null, [ Validators.required ] ],
      fats: [ null, [ Validators.required ] ],
      calories: [ null, [ Validators.required ] ],
    })
  }

  ngOnInit(){
    super.ngOnInit();
    this.form.controls.unit.setValue(this.units[0].name);
  }

  protected setPageTitle(){
    if(this.currentAction == 'new'){
      this.pageTitle = 'Registering new food';
    }else{
      this.pageTitle = 'Editing food ' + (this.resource.name);
    }
  }

  createResource(){
    this.unformatAllMasks();
    super.createResource();
  }

  updateResource(){
    this.unformatAllMasks();
    super.updateResource();
  }

  unformatAllMasks(){
    this.form.value.serving = this.unformatMask(this.form.value.serving);
    this.form.value.carbohydrates = this.unformatMask(this.form.value.carbohydrates);
    this.form.value.proteins = this.unformatMask(this.form.value.proteins);
    this.form.value.fats = this.unformatMask(this.form.value.fats);
    this.form.value.calories = this.unformatMask(this.form.value.calories);
  }

}
