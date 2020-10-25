import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    @Output() public navToggle = new EventEmitter<void>();
}
