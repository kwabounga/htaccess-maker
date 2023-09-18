import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedRulesComponent } from './locked-rules.component';

describe('LockedRulesComponent', () => {
  let component: LockedRulesComponent;
  let fixture: ComponentFixture<LockedRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockedRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockedRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
