import { TestBed, inject } from '@angular/core/testing';

import { MovieCategoryService } from './movie-category.service';

describe('MovieCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieCategoryService]
    });
  });

  it('should be created', inject([MovieCategoryService], (service: MovieCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
