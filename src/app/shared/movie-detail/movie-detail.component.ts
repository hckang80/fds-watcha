import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

import { MovieDetailService } from '../../core/movie-detail.service';
import { MovieDetailDialogService } from '../../core/movie-detail-dialog.service';

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  stillCutLength = this.movieDetailService.movie.still_cuts.length;
  sliderDirect = 'right';
  movieDetail: Element;
  stillCuts = [];
  activeNum = 0;
  currentNum: number;
  interval = null;
  autoPlay = null;
  timer = 4000;
  OPACITY: number;
  
  commetRating: number;

  constructor(
    public movieDetailService: MovieDetailService,
    private el: ElementRef,
    private renderer: Renderer2,
    public movieDetailDialogService: MovieDetailDialogService
  ) { }

  ngOnInit() {
    this.movieDetail = document.querySelector('.movie-detail');
    this.renderer.setStyle(this.movieDetail, 'top', `${window.scrollY}px`);

    this.autoFn();
  }

  getTransition(i) {
    if (i === this.currentNum) {
      return 'opacity .8s';
    } else {
      return null;
    }
  }

  getOpacity(i) {
    if (i === this.currentNum) {
      return 0;
    } else if (i === this.activeNum) {
      return 1;
    } else {
      return null;
    }
  }

  getZIndex(i) {
    if (i === this.currentNum) {
      return 3;
    } else if (i === this.activeNum) {
      return 2;
    } else {
      return null;
    }
  }

  currentMovieNumberInit(direction) {
    this.currentNum = this.activeNum;
    if (direction === 'right') {
      this.activeNum += 1;
      if (this.activeNum === this.stillCutLength) {
        this.activeNum = 0;
      }
    } else if (direction === 'left') {
      this.activeNum -= 1;
      if (this.activeNum < 0) {
        this.activeNum = this.stillCutLength - 1;
      }
    } else {
      this.activeNum = direction;
    }
  }

  autoFn() {
    this.autoPlay = setInterval(() => {
      this.currentMovieNumberInit('right');
    }, this.timer);
  }

  nextMovie(direct: string) {
    this.sliderDirect = direct;

    this.currentMovieNumberInit(this.sliderDirect);
    clearInterval(this.autoPlay);
    this.autoFn();
  }

  // openDialog() {
  //   this.staffDetail.openDialog();
  // }
}
