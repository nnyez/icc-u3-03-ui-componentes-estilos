import { TestBed } from '@angular/core/testing';

import { ThemeRepository } from './theme-repository';

describe('ThemeRepository', () => {
  let service: ThemeRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
