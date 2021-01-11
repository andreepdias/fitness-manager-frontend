import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoutinesComponent } from './routines/routines.component';

const routes: Routes = [
  { path: 'routines', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: '', component: RoutinesComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutinesRoutingModule { }
