import { Injectable, Injector } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { SessionExercise } from './session-exercise.model';
import { TrainingRoutine } from './training-routine.model';
import { TrainingSession } from './training-session.model';

@Injectable({
  providedIn: 'root'
})
export class RoutineService extends BaseResourceService<TrainingRoutine> {

  constructor(
    protected injector: Injector
  ) {
    super(injector, 'trainings', TrainingRoutine.fromJSON);
  }
  
  getActiveTrainingRoutine(){
    return this.http.get(`${this.apiURL}/active`).pipe(
      catchError(this.handleError),
      map(this.jsonToResource.bind(this))
    );
  }

  createSessionExercise(sessionExercise: SessionExercise){
    return this.http.post(`${this.apiURL}/session-exercise`, sessionExercise).pipe(
      catchError(this.handleError),
      map(SessionExercise.fromJSON.bind(this))
    );
  }

  updateSessionExercise(sessionExercise: SessionExercise){
    return this.http.post(`${this.apiURL}/session-exercise/${sessionExercise.id}`, sessionExercise).pipe(
      catchError(this.handleError),
      map(() => sessionExercise)
    );
  }

  deleteSessionExercise(sessionExercise: SessionExercise){
    return this.http.delete(`${this.apiURL}/session-exercise/${sessionExercise.id}`).pipe(
      catchError(this.handleError),
      map(() => sessionExercise)
    );
  }

  updateTrainingSession(trainingSession: TrainingSession){
    return this.http.post(`${this.apiURL}/session/${trainingSession.id}`, trainingSession).pipe(
      catchError(this.handleError),
      map(() => trainingSession )
    );
  }
}
