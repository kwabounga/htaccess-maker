import { TestBed } from '@angular/core/testing';

import { FilesStuffService } from './files-stuff.service';

describe('FilesStuffService', () => {
  let service: FilesStuffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesStuffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
