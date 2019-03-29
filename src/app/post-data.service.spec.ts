import { TestBed } from '@angular/core/testing';

import { PostdataService } from './post-data.service';

describe('PostdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostdataService = TestBed.get(PostdataService);
    expect(service).toBeTruthy();
  });
});
