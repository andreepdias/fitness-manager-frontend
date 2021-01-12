import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService extends BaseResourceService<Exercise>{

  constructor(
    protected injector: Injector,
  ) {
    super(injector, 'exercises', Exercise.fromJSON);
  }
}
