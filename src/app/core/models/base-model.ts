import {v4 as Guid} from 'uuid';

export class BaseModel {
    // tslint:disable-next-line: variable-name
    private _guid: string;

    public get guid(): string {
        return this._guid;
    }

    constructor() {
        this._guid = Guid();
    }
}
