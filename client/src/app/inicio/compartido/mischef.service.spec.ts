import { TestBed } from '@angular/core/testing';

import { MischefService } from './mischef.service';

describe('MischefService', () => {
  let service: MischefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MischefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
