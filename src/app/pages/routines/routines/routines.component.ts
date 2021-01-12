import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { Exercise } from '../../exercises/shared/exercise.model';
import { ExerciseService } from '../../exercises/shared/exercise.service';
import { RoutineService } from '../shared/routine.service';
import { SessionExercise } from '../shared/session-exercise.model';
import { TrainingRoutine } from '../shared/training-routine.model';
import { TrainingSession } from '../shared/training-session.model';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {

  routine: TrainingRoutine = new TrainingRoutine();

  exercises: Exercise[] = [];

  modalCreateEditForm: FormGroup = new FormGroup({});
  displayModalCreateEdit: boolean = false;
  modalCreateEditCurrentAction: string = '';

  modalEditSessionForm: FormGroup = new FormGroup({});
  displayModalEditSession: boolean = false;
  
  imaskConfig: any = {
    mask: Number,
    scale: 0,
    thousandsSeparator: '',
    padFractionalZeros: false,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    private service: RoutineService,
    private exerciseService: ExerciseService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
    ){}

    /** INITAL SETUP */

  ngOnInit(): void {
    this.buildModalCreateEditForm();
    this.buildModalEditSession();
    this.loadRoutine();
    this.loadExercises();
  }

  buildModalCreateEditForm(){
    this.modalCreateEditForm = this.formBuilder.group({
      id: [ null ],
      sets: [ null, [ Validators.required ] ],
      repetitions: [ null, [ Validators.required ] ],
      restInterval: [ null, [ Validators.required ] ],
      exercise: [ null, [ Validators.required ] ],
      trainingSessionId: [ null, [ Validators.required ] ]
    });
  }


  buildModalEditSession(){
    this.modalEditSessionForm = this.formBuilder.group({
      id: [ null ],
      orderNumber: [ null ],
      description: [ null, [ Validators.required ] ],
      sessionExercises: [ null ]
    });
  }

  loadRoutine(){
    if(this.route.snapshot.url.length === 0){
      this.loadActiveRoutine();
    }else{
      this.loadRoutineFromRoute();
    }
  }

  loadActiveRoutine(){
    this.service.getActiveTrainingRoutine().subscribe(
      success => this.routine = success,
      error => console.log('Error on  get active training routine: ', error)
    );
  }

  loadRoutineFromRoute(){
    this.route.params.pipe(
      switchMap(params => this.service.getById(+params['id']))
    ).subscribe(
      success => this.routine = success,
      error => console.log('Error on  get training routine by id: ', error)
    );
  }

  createRoutine(){
    this.router.navigateByUrl("/routines/new");

  }

  getTagColor(id: number){
    return Exercise.getTagColor(id);
  }

  loadExercises(){
    this.exerciseService.getAll().subscribe(
      success => this.exercises = success,
      error => console.log('Error loading exercises: ', error)
    );
  }

  deleteSessionExercise(sessionExercise: SessionExercise){
    this.service.deleteSessionExercise(sessionExercise).subscribe(
      success => this.actionsForSuccessDeleteSessionExercise(success),
      error => this.actionsForErrorDeleteSessionExercise(error),
    )
  }

  actionsForSuccessDeleteSessionExercise(success: any){
    const message = success.exercise.name + ' was successfully deleted.';
    this.toastr.success(message, 'Success');

    const trainingSession = this.routine.trainingSessions.filter(x => x.id == success.trainingSessionId)[0];
    const sessionExercise = trainingSession.sessionExercises.filter(x => x.id == success.id)[0];
    const index = trainingSession.sessionExercises.indexOf(sessionExercise);
    trainingSession.sessionExercises.splice(index, 1);
  }
  
  actionsForErrorDeleteSessionExercise(error: any){
    error.error.errors.forEach((message: string) => {
      this.toastr.error(message, 'Deletion failed');
    });
  }

  showModalEditCreate(event: any, action: string) {
    this.displayModalCreateEdit = true;
    this.modalCreateEditCurrentAction = action;
    this.loadSessionExercises(event);
  }

  loadSessionExercises(event: any){
    if(this.modalCreateEditCurrentAction == 'edit'){
      event.sets = String(event.sets);
      event.repetitions = String(event.repetitions);
      event.restInterval = String(event.restInterval);
      this.modalCreateEditForm.patchValue(event);
    }else{
      this.modalCreateEditForm.controls.trainingSessionId.setValue(event.id);
    }
    if(this.exercises.length > 0 && !this.modalCreateEditForm.value.exercise)  this.modalCreateEditForm.controls.exercise.setValue(this.exercises[0]);
  }

  onSubmitModalCreateEditForm(){
    if(this.modalCreateEditCurrentAction == 'new'){
      this.createSessionExercise();
    }else{
      this.updateSessionExercise();
    }
  }

  createSessionExercise(){
    const sessionExercise = SessionExercise.fromJSON(this.modalCreateEditForm.value);
    this.service.createSessionExercise(sessionExercise).subscribe(
      success => this.actionsForSuccess(success),
      error => this.actionsForError(error)
      );
    }
    
  updateSessionExercise(){
    const sessionExercise = SessionExercise.fromJSON(this.modalCreateEditForm.value);
    this.service.updateSessionExercise(sessionExercise).subscribe(
      success => this.actionsForSuccess(success),
      error => this.actionsForError(error)
    );
  }

  actionsForSuccess(success: any){
    this.showSuccessToastr(success.exercise.name);
    const trainingSession = this.routine.trainingSessions.filter(x => x.id == success.trainingSessionId)[0];

    if(this.modalCreateEditCurrentAction == 'new'){
      trainingSession.sessionExercises.push(success);
    }else{
      const sessionExercise = trainingSession.sessionExercises.filter(x => x.id == success.id)[0];
      const index = trainingSession.sessionExercises.indexOf(sessionExercise);
      trainingSession.sessionExercises[index] = success;
    }
    this.displayModalCreateEdit = false;
  }

  actionsForError(error: any){
    this.showErrorToastr(error);
  }

  showSuccessToastr(name: string){
    const operation = this.modalCreateEditCurrentAction == 'new' ? 'added' : 'edited';
    const message = name + ' was successfully ' + operation + '.';
    this.toastr.success('Success', message);
  }
  
  showErrorToastr(error: any){
    const operation = this.modalCreateEditCurrentAction == 'new' ? 'Adition' : 'Edition';
    error.error.errors.forEach((message: string) => {
      this.toastr.error(message, operation + ' failed');
    });
  }

  showModalEditSession(event: any){
    this.displayModalEditSession = true;
    this.loadTrainingSession(event);
  }

  loadTrainingSession(event: any){
    this.modalEditSessionForm.patchValue(event);
  }

  onSubmitModalEditSessionForm(){
    this.updateTrainingSession();
  }
    
  updateTrainingSession(){
    const trainingSession = TrainingSession.fromJSON(this.modalEditSessionForm.value);
    
    this.service.updateTrainingSession(trainingSession).subscribe(
      success => this.actionsForSuccessEditSession(success),
      error => this.actionsForError(error)
    );
  }

  actionsForSuccessEditSession(success: any){
    this.showSuccessToastr(success.description);
    const trainingSession = this.routine.trainingSessions.filter(x => x.id == success.id)[0];

    const index = this.routine.trainingSessions.indexOf(trainingSession);
    this.routine.trainingSessions[index] = success;

      this.displayModalEditSession = false;
  }

}
