import { BaseModel, type } from '@breakerboxer/core';
import { IDrawable } from '@breakerboxer/web/bb-workspace';
import { Breaker } from '../breaker';

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
