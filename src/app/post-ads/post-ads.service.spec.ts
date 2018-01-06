import { TestBed, inject } from '@angular/core/testing';

import { PostAdsService } from './post-ads.service';

describe('PostAdsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostAdsService]
    });
  });

  it('should be created', inject([PostAdsService], (service: PostAdsService) => {
    expect(service).toBeTruthy();
  }));
});
