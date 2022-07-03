import { TestBed } from '@angular/core/testing';

import { EncrpassService } from './encrpass.service';

describe('EncrpassService', () => {
  let service: EncrpassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncrpassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
