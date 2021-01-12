import { User } from "../../authentication/user.model";
import { TrainingSession } from "./training-session.model";

export class TrainingRoutine {
    id: number = 0;
    name: string = '';
    description: string = '';
    weekFrequency: number = 0;
    isActiveRoutine: boolean = false;
    trainingSessions: TrainingSession[] = [];
    user: User = new User('', '', '');

    static fromJSON(json: any){
        return Object.assign(new TrainingRoutine(), json);
    }
}