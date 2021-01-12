import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Exercise } from '../shared/exercise.model';
import { ExerciseService } from '../shared/exercise.service';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.css']
})
export class ExercisesListComponent extends BaseResourceListComponent<Exercise> implements OnInit {

  constructor(
    protected injector: Injector,
    protected service: ExerciseService
  ) {
    super(injector, service);
  }

  getTagColor(id: number){
    return Exercise.getTagColor(id);
  }
}
