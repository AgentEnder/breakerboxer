import { BaseModel, type } from '../base-model';
import { Breaker } from '../breaker';
import { IDrawable } from '../drawables/idrawable';

export interface IElectricalComponent extends BaseModel {
    name: string;
    notes: string;
    representation: IDrawable;
    connections: IElectricalComponent[];
    breaker?: Breaker;
}

export class ElectricalComponent extends BaseModel implements IElectricalComponent 
{
    type: type = 'electrical-component';
    name: string;
    notes: string;
    representation: IDrawable;
    connections: IElectricalComponent[];
    breaker?: Breaker;
}
