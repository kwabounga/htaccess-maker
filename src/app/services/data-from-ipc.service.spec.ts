import { TestBed } from '@angular/core/testing';

import { DataFromIpcService } from './data-from-ipc.service';

describe('DataFromIpcService', () => {
  let service: DataFromIpcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFromIpcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
