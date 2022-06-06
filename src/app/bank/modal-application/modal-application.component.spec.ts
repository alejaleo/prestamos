import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalApplicationComponent } from './modal-application.component';

describe('ModalApplicationComponent', () => {
  let component: ModalApplicationComponent;
  let fixture: ComponentFixture<ModalApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
