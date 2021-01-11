import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TagsFormComponent } from './tags-form/tags-form.component';
import { TagsListComponent } from './tags-list/tags-list.component';

const routes: Routes = [
  { path: 'tags', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: 'list', component: TagsListComponent },
    { path: 'new', component: TagsFormComponent },
    { path: ':id/edit', component: TagsFormComponent },
    { path: '', redirectTo: '/tags/list', pathMatch: 'full' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
