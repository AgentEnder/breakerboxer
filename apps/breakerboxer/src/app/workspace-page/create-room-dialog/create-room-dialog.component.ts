import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectsService } from '@tbs/web-app/core/services/projects.service';
import { Room, IDrawable } from '@tbs/xplat/base/breakerboxer-data';

@Component({
    selector: 'app-create-room-dialog',
    templateUrl: './create-room-dialog.component.html'
})
export class CreateRoomDialogComponent {

    roomDetails = new Room('');

    constructor(
        private dialogRef: MatDialogRef<CreateRoomDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {drawable: IDrawable},
        private projectsService: ProjectsService
    ) {
    }

    saveRoom(): void {
        this.projectsService.addRoom(this.data.drawable, this.roomDetails);
        this.dialogRef.close();
    }
}
