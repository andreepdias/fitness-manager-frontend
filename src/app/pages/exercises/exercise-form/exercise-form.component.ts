import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Tag } from '../../tags/shared/tag.model';
import { TagService } from '../../tags/shared/tag.service';
import { Exercise } from '../shared/exercise.model';
import { ExerciseService } from '../shared/exercise.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.css']
})
export class ExerciseFormComponent extends BaseResourceFormComponent<Exercise> implements OnInit {

  tags: Tag[] = [];

  constructor(
    protected injector: Injector,
    protected service: ExerciseService,
    protected tagService: TagService
  ) {
    super(injector, service, new Exercise(), Exercise.fromJSON);
  }

  ngOnInit(){
    this.loadTags();
    super.ngOnInit();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      id: [ null ],
      name: [ null, [ Validators.required ] ],
      tags: [ null, [ Validators.required ] ],
    });
  }

  setPageTitle(){
    if(this.currentAction == 'new'){
      this.pageTitle = 'Creating new Exercise';
    }else{
      this.pageTitle = 'Edit exercise ' + this.resource.name;
    }
  }
  
  actionsForSuccessLoad(success: any){
    super.actionsForSuccessLoad(success);
    const tagsId = success.tags.map((x: Tag) => x.id);
    this.form.controls.tags.setValue(tagsId);
  }



  loadTags(){
    this.tagService.getAll().subscribe(
      success => this.actionsForSuccessLoadTags(success),
      error => this.actionsForErrorLoadTags(error),
    );
  }

  actionsForSuccessLoadTags(success: any){
    this.tags = success;
  }

  actionsForErrorLoadTags(error: any){
    console.log('Error loading tags: ', error);
  }

  selectExerciseTags(event: any){
    const choosenTagsSet = new Set<number>(event.value);

    this.resource.tags = this.resource.tags.filter((x: any) => choosenTagsSet.has(x.id)); // remove unsed tags
    
    const exercisesTagsSet = new Set<number>(this.resource.tags.map((tag: any) => tag.id)); 
    const toAddSet = new Set([...choosenTagsSet].filter(x => !exercisesTagsSet.has(x) )); 

    for(let tagId of toAddSet){
      const tag = this.tags.filter(tag => tag.id == tagId)[0];
      this.resource.tags.push(tag);
    }
  }

  onSubmitForm(){
    this.form.value.tags = this.resource.tags;
    super.onSubmitForm();
  }


}
