import { Exercise } from "../../exercises/shared/exercise.model";

export class SessionExercise {
    id: number = 0;
    exercise: Exercise = new Exercise();
    sets: number = 0;
    repetitions: number = 0;
    restInterval: number = 0;
    trainingSessionId: number = 0;

    static fromJSON(json: any){
        return Object.assign(new SessionExercise(), json);
    }
}