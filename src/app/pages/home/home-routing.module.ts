import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: '', component: HomeComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
