import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Tag } from '../shared/tag.model';
import { TagService } from '../shared/tag.service';

@Component({
  selector: 'app-tags-form',
  templateUrl: './tags-form.component.html',
  styleUrls: ['./tags-form.component.css']
})
export class TagsFormComponent extends BaseResourceFormComponent<Tag> implements OnInit {

  constructor(
    protected injector: Injector,
    protected service: TagService
  ) {
    super(injector, service, new Tag(), Tag.fromJSON);
  }

  protected buildForm(){
    this.form = this.formBuilder.group({
      id: [ null ],
      name: [ null, [ Validators.required ] ]
    });
  }

  protected setPageTitle(){
    if(this.currentAction == 'new'){
      this.pageTitle = 'Creating new Tag';
    }else{
      this.pageTitle = 'Editing Tag ' + this.resource.name;
    }
  }

}
