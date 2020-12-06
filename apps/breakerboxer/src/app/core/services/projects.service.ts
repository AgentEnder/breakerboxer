import { Injectable } from '@angular/core';

import { from, Subject } from 'rxjs';

import { BaseModel } from '@tbs/core';
import { IDrawable } from '@tbs/web/bb-workspace';

import { IBreaker, IElectricalComponent, IRoom } from '../models';
import { assertType } from '../utils/assertType';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {

    private drawablesByComponent: {[componentId: string]: IDrawable} = {};
    private componentsByDrawable: {[drawableId: string]: BaseModel} = {};
    public rooms: IRoom[] = [];
    private roomsSubject = new Subject<IRoom[]>();
    public rooms$ = from(this.roomsSubject);

    public getDrawableForComponent(component: IElectricalComponent): IDrawable {
        return this.drawablesByComponent[component.guid];
    }

    public getObjectForDrawable(drawable: IDrawable): BaseModel {
        return this.componentsByDrawable[drawable.guid];
    }

    public addRoom(drawable: IDrawable, room: IRoom): void {
        this.componentsByDrawable[drawable.guid] = room;
        this.drawablesByComponent[room.guid] = drawable;
        this.rooms.push(room);
        this.roomsSubject.next(this.rooms);
    }

    public addComponentToRoom(drawable: IDrawable, component: IElectricalComponent, room: IRoom): void {
        room.components = room.components || [];
        room.components.push(component);
        this.componentsByDrawable[drawable.guid] = component;
        this.drawablesByComponent[component.guid] = drawable;
    }

    public getLinkedDrawables(drawable: IDrawable): IDrawable[] {
        const component = this.componentsByDrawable[drawable.guid];
        if (component.type === 'room' ) {
            assertType<IRoom>(component);
            return (component).components.map(x => this.drawablesByComponent[x.guid]);
        }
        if (component.type === 'electrical-component') {
            assertType<IElectricalComponent>(component);
            const connected = component.connections.map(x => this.drawablesByComponent[x.guid]);
            if (component.breaker) {
                connected.push(this.drawablesByComponent[component.breaker.guid]);
            }
            return connected;
        }
        if (component.type === 'breaker') {
            assertType<IBreaker>(component);
            const connected = component.components.map(x => this.drawablesByComponent[x.guid]);
            return connected;
        }
    }
}
