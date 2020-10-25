import { BaseModel } from './base-model';
import { IElectricalComponent } from './electrical-components/electrical-component';

export interface IBreaker {
    name: string;
    components: IElectricalComponent[];
}

export class Breaker extends BaseModel implements IBreaker {
    name: string;
    components: IElectricalComponent[] = [];

    constructor(name: string) {
        super();
        this.name = name;
    }
}
