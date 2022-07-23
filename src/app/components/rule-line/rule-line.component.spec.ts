import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleLineComponent } from './rule-line.component';

describe('ListRulesComponent', () => {
  let component: RuleLineComponent;
  let fixture: ComponentFixture<RuleLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
