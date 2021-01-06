import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RecipesFormComponent } from './recipes-form/recipes-form.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';

const routes: Routes = [
  { path: 'recipes', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: 'list', component: RecipesListComponent },
    { path: 'new', component: RecipesFormComponent },
    { path: ':id/edit', component: RecipesFormComponent },
    { path: '', redirectTo: '/recipes/list', pathMatch: 'full' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
