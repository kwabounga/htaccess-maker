import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeConfigComponent } from './scope-config.component';

describe('ScopeConfigComponent', () => {
  let component: ScopeConfigComponent;
  let fixture: ComponentFixture<ScopeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopeConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScopeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
