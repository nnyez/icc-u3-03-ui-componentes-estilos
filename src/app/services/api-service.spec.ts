import { TestBed } from '@angular/core/testing';

import { SimpsonApi } from './api-service';

describe('ApiService', () => {
  let service: SimpsonApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpsonApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
