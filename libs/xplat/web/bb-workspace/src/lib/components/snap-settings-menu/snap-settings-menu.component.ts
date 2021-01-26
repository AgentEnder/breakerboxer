import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { SnapSettings } from '../../models';

@Component({
    selector: 'breakerboxer-snap-settings-menu',
    templateUrl: './snap-settings-menu.component.html'
})
export class SnapSettingsMenuComponent {
    snapSettingsModel: SnapSettings = {
        angleSnapSettings: {
            angles: [],
            snap: true
        },
        gridSnapSettings: {
            displayGrid: true,
            gridSizeX: 50,
            gridSizeY: 50,
            snap: true
        }
    };

    @Input() set snapSettings(v: SnapSettings) {
        this.snapSettingsModel = v;
    }

    get snapSettings(): SnapSettings { return this.snapSettingsModel; }

    @Output() snapSettingsChange = new EventEmitter<SnapSettings>();

    refreshSnapSettings(): void {
        this.snapSettingsChange.emit(this.snapSettingsModel);
    }
}
