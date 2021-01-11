import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { Tag } from './tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseResourceService<Tag> {

  constructor(
    protected injector: Injector
  ) {
    super(injector, 'tags', Tag.fromJSON)
  }
}
