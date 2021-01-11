export class Tag{
    id: number = 0;
    name: string = '';
    
    static fromJSON(json: any){
        return  Object.assign(new Tag(), json);
    }

};