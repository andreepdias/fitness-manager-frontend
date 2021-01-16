import { SessionExercise } from "./session-exercise.model";

export class TrainingSession{
    id: number = 0;
    orderNumber: number = 0;
    description: string = '';
    isCurrentSession: boolean = false;
    sessionExercises: SessionExercise[] = [];
    trainingRoutineId: number = 0 ;
    
    static fromJSON(json: any){
        return Object.assign(new TrainingSession(), json);
    }
}