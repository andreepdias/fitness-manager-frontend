import { Location } from '@angular/common';
import { AfterContentChecked, Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { RoutineService } from '../shared/routine.service';
import { TrainingRoutine } from '../shared/training-routine.model';

@Component({
  selector: 'app-routines-form',
  templateUrl: './routines-form.component.html',
  styleUrls: ['./routines-form.component.css']
})
export class RoutinesFormComponent extends BaseResourceFormComponent<TrainingRoutine> implements OnInit, AfterContentChecked {

  weekFrequencies = [
    { code: 1 },
    { code: 2 },
    { code: 3 },
    { code: 4 },
    { code: 5 },
    { code: 6 },
    { code: 7 },
  ];

  constructor(
    protected injector: Injector,
    protected service: RoutineService,
    private location: Location
  ) {
    super(injector, service, new TrainingRoutine(), TrainingRoutine.fromJSON);
  }

  buildForm(){
    this.form = this.formBuilder.group({
      id: [ null ],
      name: [ null, [ Validators.required ] ],
      description: [ null, [ Validators.required ] ],
      goal: [ null, [ Validators.required ] ],
      weekFrequency: [ 1, [ Validators.required ] ],
      isActiveRoutine: [ true ],
    });
  }

  setPageTitle(){
    if(this.currentAction == 'new'){
      this.pageTitle = 'Creating new Training Routine';
    }else{
      this.pageTitle = 'Editing training routine ' + this.resource.name;
    }
  }

  actionsForSuccess(success: any){
    this.showSuccessToast(success);
    this.router.navigateByUrl('/routines/list')
  }

  deleteResource(){
    const resource = TrainingRoutine.fromJSON(this.form.value);
    this.service.delete(resource).subscribe(
      success => this.actionsForSuccessDelete(success),
      error => this.actionsForFailedDelete(error)
    );
  }

  actionsForSuccessDelete(success: any){
    this.toastr.success(success.name + ' was successfully deleted.', 'Deletion succeed');
    this.router.navigateByUrl("/routines/list");
  }
  
  actionsForFailedDelete(error: any){
    error.error.errors.forEach((message: string) => {
      this.toastr.error(message, 'Deletion failed');
    });
  }

  goBack(){
    this.location.back();
  }
}
