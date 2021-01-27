import { BaseModel, type } from '@tbs/xplat/core';
import { IElectricalComponent } from './electrical-components/electrical-component';

export interface IBreaker extends BaseModel {
    name: string;
    components: IElectricalComponent[];
}

export class Breaker extends BaseModel implements IBreaker {
    name: string;
    components: IElectricalComponent[] = [];
    type: type = 'breaker';

    constructor(name: string) {
        super();
        this.name = name;
    }
}
