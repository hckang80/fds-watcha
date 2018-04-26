import { TestBed, inject } from '@angular/core/testing';

import { BoxOfficePagenationService } from './box-office-pagenation.service';

describe('BoxOfficePagenationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoxOfficePagenationService]
    });
  });

  it('should be created', inject([BoxOfficePagenationService], (service: BoxOfficePagenationService) => {
    expect(service).toBeTruthy();
  }));
});
