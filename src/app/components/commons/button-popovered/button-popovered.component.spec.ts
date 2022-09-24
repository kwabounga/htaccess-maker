import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPopoveredComponent } from './button-popovered.component';

describe('ButtonPopoveredComponent', () => {
  let component: ButtonPopoveredComponent;
  let fixture: ComponentFixture<ButtonPopoveredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonPopoveredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonPopoveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
