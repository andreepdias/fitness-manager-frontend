import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MealsComponent } from './meals/meals.component';
import { UserMealsInfoFormComponent } from './meals-info-form/meals-info-form.component';

const routes: Routes = [
  { path: 'meals', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: ':id', component: UserMealsInfoFormComponent },
    { path: '', component: MealsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealsRoutingModule { }
