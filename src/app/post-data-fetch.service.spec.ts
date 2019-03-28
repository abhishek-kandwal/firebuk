import { TestBed } from '@angular/core/testing';

import { PostDataFetchService } from './post-data-fetch.service';

describe('PostDataFetchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostDataFetchService = TestBed.get(PostDataFetchService);
    expect(service).toBeTruthy();
  });
});
