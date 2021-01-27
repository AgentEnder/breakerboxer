import { BaseModel, type } from '@tbs/xplat/core';
import { IDrawable } from '@tbs/web/bb-workspace';
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
