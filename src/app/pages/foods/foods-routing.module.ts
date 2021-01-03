import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { FoodsFormComponent } from './foods-form/foods-form.component';
import { FoodsListComponent } from './foods-list/foods-list.component';

const routes: Routes = [
  { path: 'foods', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: 'list', component: FoodsListComponent },
    { path: 'new', component: FoodsFormComponent },
    { path: ':id/edit', component: FoodsFormComponent },
    { path: '', redirectTo: '/foods/list', pathMatch: 'full' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodsRoutingModule { }
