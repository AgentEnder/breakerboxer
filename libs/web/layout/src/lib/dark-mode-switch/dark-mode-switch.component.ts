import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { Subscription } from 'rxjs';

import { DarkModeService } from '@breakerboxer/core';

@Component({
    selector: 'breakerboxer-darkmode-switch',
    templateUrl: './dark-mode-switch.component.html',
    styleUrls: ['./dark-mode-switch.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DarkModeSwitchComponent {

    @Input() set dark(x: boolean) {
        this.service.setDarkMode(x);
    }

    @Output() darkChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private subscription: Subscription;

    constructor(public service: DarkModeService) {
        this.subscription = service.dark$.subscribe(x => {
            this.darkChange.emit(x);
        });
    }

    darkToggle(): void {
        this.service.darkToggle();
    }
}
