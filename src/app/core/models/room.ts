import { BaseModel } from './base-model';
import { IElectricalComponent } from './electrical-components/electrical-component';

export interface IRoom {
    guid: string;
    name: string;
    components: IElectricalComponent[];
}

export class Room extends BaseModel implements IRoom {
    name: string;
    components: IElectricalComponent[] = [];

    constructor(name: string) {
        super();
        this.name = name;
    }
}
