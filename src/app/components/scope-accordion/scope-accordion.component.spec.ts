import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeAccordionComponent } from './scope-accordion.component';

describe('ScopeAccordionComponent', () => {
  let component: ScopeAccordionComponent;
  let fixture: ComponentFixture<ScopeAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopeAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScopeAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
