import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodsRoutingModule } from './foods-routing.module';
import { FoodsListComponent } from './foods-list/foods-list.component';
import { CoreModule } from 'src/app/core/core.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FoodsFormComponent } from './foods-form/foods-form.component';


@NgModule({
  declarations: [FoodsListComponent, FoodsFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FoodsRoutingModule,
    AuthenticationModule,
  ]
})
export class FoodsModule { }
