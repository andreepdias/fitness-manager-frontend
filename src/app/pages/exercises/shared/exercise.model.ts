import { Tag } from "../../tags/shared/tag.model";

export class Exercise{
    id: number = 0;
    name: string = '';
    tags: Tag[] = [];

    

    static getTagColor(id: number){
        let TAG_COLORS = [
            'badge-info',
            'badge-success',
            'badge-danger',
            'badge-warning',
            'badge-primary',
            'badge-default',
          ];

        const colorIndex = id % TAG_COLORS.length;
        return TAG_COLORS[colorIndex];
    }

    static fromJSON(json: any){
        return Object.assign(new Exercise(), json);
    }
}