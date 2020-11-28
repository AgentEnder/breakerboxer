import {v4 as Guid} from 'uuid';

export abstract class BaseModel {
    // tslint:disable-next-line: variable-name
    public abstract type: type;
    private _guid: string;

    public get guid(): string {
        return this._guid;
    }

    constructor() {
        this._guid = Guid();
    }
}

export type type
= 'drawable'
| 'polyline'
| 'rectangle'
| 'electrical-component'
| 'breaker'
| 'room'
| 'user';
