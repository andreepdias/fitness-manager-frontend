import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { ExercisesListComponent } from './exercises-list/exercises-list.component';

const routes: Routes = [
  { path: 'exercises', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: 'list', component: ExercisesListComponent },
    { path: 'new', component: ExerciseFormComponent },
    { path: ':id/edit', component: ExerciseFormComponent },
    { path: '', redirectTo: '/exercises/list', pathMatch: 'full' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }
