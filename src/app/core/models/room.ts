import { BaseModel, type } from './base-model';
import { IElectricalComponent } from './electrical-components/electrical-component';

export interface IRoom extends BaseModel {
    guid: string;
    name: string;
    components: IElectricalComponent[];
}

export class Room extends BaseModel implements IRoom {
    name: string;
    components: IElectricalComponent[] = [];
    type: type = 'room';

    constructor(name: string) {
        super();
        this.name = name;
    }
}
