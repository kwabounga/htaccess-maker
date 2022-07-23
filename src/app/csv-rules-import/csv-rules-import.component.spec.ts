import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvRulesImportComponent } from './csv-rules-import.component';

describe('CsvRulesImportComponent', () => {
  let component: CsvRulesImportComponent;
  let fixture: ComponentFixture<CsvRulesImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvRulesImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvRulesImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
