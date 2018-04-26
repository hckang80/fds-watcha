import { Component, OnInit } from '@angular/core';

import { BoxOfficePagenationService } from '../home/box-office-pagenation.service';
import { MovieDetailService } from '../core/movie-detail.service';

import { BoxofficeMovie } from '../shared/boxoffice-movie.interface';
import { PreloaderService } from '../shared/preloader';

@Component({
  selector: 'app-boxoffice',
  templateUrl: './boxoffice.component.html',
  styleUrls: ['./boxoffice.component.scss']
})
export class BoxofficeComponent implements OnInit {
  movieDetail: BoxofficeMovie;
  mainView = false;
  constructor(
    public boxOfficePage: BoxOfficePagenationService, 
    public movieDetailService: MovieDetailService,
    public preloader: PreloaderService
  ) { }

  ngOnInit() {
    this.preloader.show();
    this.boxOfficePage.loadTopFive();
    this.movieDetailService.getBoxOfficeDetail()
      .subscribe(
        movie => {
          this.movieDetail = movie;
          this.preloader.hide();
          this.mainView = true;
        },
        ({ error }) => {
          console.log('ERROR', error.message);
        }
      );
  }
}
