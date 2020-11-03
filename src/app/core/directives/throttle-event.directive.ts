import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
    selector: '[appThrottleEvent]'
})
export class ThrottleEventDirective implements OnInit, OnDestroy {

    @Input('appThrottleEvent') event: string;
    @Input() throttleTime = 250;

    private subscription: Subscription;
    @Output() throttledEvent = new EventEmitter<UnknownEvent>();

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        this.subscription = fromEvent(this.el.nativeElement, this.event).pipe(
            throttleTime(this.throttleTime)
        ).subscribe((x: UnknownEvent) => {
            this.throttledEvent.emit(x);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

export type UnknownEvent = Partial<MouseEvent & Event & KeyboardEvent>;
