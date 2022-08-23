import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleLineBadRedirectionComponent } from './rule-line-bad-redirection.component';

describe('RuleLineBadRedirectionComponent', () => {
  let component: RuleLineBadRedirectionComponent;
  let fixture: ComponentFixture<RuleLineBadRedirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleLineBadRedirectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleLineBadRedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
