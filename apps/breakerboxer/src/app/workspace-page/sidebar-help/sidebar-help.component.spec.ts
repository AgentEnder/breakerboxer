import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarHelpComponent } from './sidebar-help.component';

describe('SidebarHelpComponent', () => {
  let component: SidebarHelpComponent;
  let fixture: ComponentFixture<SidebarHelpComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SidebarHelpComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
