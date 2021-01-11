import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Tag } from '../shared/tag.model';
import { TagService } from '../shared/tag.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent extends BaseResourceListComponent<Tag> implements OnInit {

  constructor(
    protected injector: Injector,
    protected service: TagService
  ) {
    super(injector, service)
  }

}
