import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsListComponent } from './tags-list/tags-list.component';
import { SharedModule } from "../../shared/shared.module";
import { TagsFormComponent } from './tags-form/tags-form.component';


@NgModule({
  declarations: [TagsListComponent, TagsFormComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    SharedModule
  ]
})
export class TagsModule { }
