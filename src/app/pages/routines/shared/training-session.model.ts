import { SessionExercise } from "./session-exercise.model";

export class TrainingSession{
    id: number = 0;
    orderNumber: number = 0;
    description: string = '';
    sessionExercises: SessionExercise[] = [];
    
    static fromJSON(json: any){
        return Object.assign(new TrainingSession(), json);
    }
}