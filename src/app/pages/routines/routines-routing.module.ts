import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoutinesFormComponent } from './routines-form/routines-form.component';
import { RoutinesListComponent } from './routines-list/routines-list.component';
import { RoutinesComponent } from './routines/routines.component';

const routes: Routes = [
  { path: 'routines', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: 'list', component: RoutinesListComponent },
    { path: 'new', component: RoutinesFormComponent },
    { path: ':id/edit', component: RoutinesFormComponent },
    { path: ':id', component: RoutinesComponent },
    { path: '', component: RoutinesComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutinesRoutingModule { }
