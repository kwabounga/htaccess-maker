import { TestBed } from '@angular/core/testing';

import { OutputHtaccessService } from './output-htaccess.service';

describe('OutputHtaccessService', () => {
  let service: OutputHtaccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutputHtaccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
