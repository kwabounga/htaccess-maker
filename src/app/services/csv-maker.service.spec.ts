import { TestBed } from '@angular/core/testing';

import { CsvMakerService } from './csv-maker.service';

describe('CsvMakerService', () => {
  let service: CsvMakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvMakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
