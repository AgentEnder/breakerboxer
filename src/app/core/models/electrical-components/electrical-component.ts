import { BaseModel } from '../base-model';
import { Breaker } from '../breaker';
import {IDrawable} from '../drawables/idrawable';

export interface IElectricalComponent {
    name: string;
    notes: string;
    representation: IDrawable;
    connections: IElectricalComponent[];
    breaker?: Breaker;
}

export class ElectricalComponent extends BaseModel implements IElectricalComponent{
    name: string;
    notes: string;
    representation: IDrawable;
    connections: IElectricalComponent[];
    breaker?: Breaker;
}
