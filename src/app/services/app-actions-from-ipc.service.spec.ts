import { TestBed } from '@angular/core/testing';

import { AppActionsFromIpcService } from './app-actions-from-ipc.service';

describe('AppActionsFromIpcService', () => {
  let service: AppActionsFromIpcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppActionsFromIpcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
