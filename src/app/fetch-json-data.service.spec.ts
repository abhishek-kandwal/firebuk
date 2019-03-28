import { TestBed } from '@angular/core/testing';

import { FetchJsonDataService } from './fetch-json-data.service';

describe('FetchJsonDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchJsonDataService = TestBed.get(FetchJsonDataService);
    expect(service).toBeTruthy();
  });
});
