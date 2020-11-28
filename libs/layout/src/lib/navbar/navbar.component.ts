import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
    selector: 'breakerboxer-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    @Output() public navToggle = new EventEmitter<void>();
}
