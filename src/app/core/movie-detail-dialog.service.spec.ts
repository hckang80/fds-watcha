import { TestBed, inject } from '@angular/core/testing';

import { MovieDetailDialogService } from './movie-detail-dialog.service';

describe('MovieDetailDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDetailDialogService]
    });
  });

  it('should be created', inject([MovieDetailDialogService], (service: MovieDetailDialogService) => {
    expect(service).toBeTruthy();
  }));
});
