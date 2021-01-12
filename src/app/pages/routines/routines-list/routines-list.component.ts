import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { RoutineService } from '../shared/routine.service';
import { TrainingRoutine } from '../shared/training-routine.model';

@Component({
  selector: 'app-routines-list',
  templateUrl: './routines-list.component.html',
  styleUrls: ['./routines-list.component.css']
})
export class RoutinesListComponent extends BaseResourceListComponent<TrainingRoutine> implements OnInit {

  constructor(
    protected injector: Injector,
    protected service: RoutineService
  ) {
    super(injector, service);
  }

}
