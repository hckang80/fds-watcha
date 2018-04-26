import { Component, OnInit } from '@angular/core';
import { MovieDetailService } from '../../core/movie-detail.service';
import { MovieDetail } from '../../shared/movie-detail.interface';

@Component({
  selector: 'visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss']
})
export class VisualComponent implements OnInit {
  movies: MovieDetail[] = [];
  visual = [112, 21, 111];
  message: string;
  sliderDirect = 'right';
  activeNum = 0;
  currentNum: number;
  timer = 4000;
  isAni = false;
  autoPlay = null;
  interval = null;
  sliderItem;
  sliderDot;
  btnArrow;
  btnDot;
  OPACITY: number;

  constructor(private movieDetailService: MovieDetailService) { }

  ngOnInit() {
    this.visual.forEach ( num => {
      this.movieDetailService.mainMovie(num)
        .subscribe(
          movie => {
            this.movies = this.movies.concat(movie);
          },
          ({ error }) => {
            console.log('ERROR', error.message);
            this.message = error.message;
          }
        );
    });

    this.sliderItem = document.querySelectorAll('.main-slider .body li');
    this.sliderItem = [].slice.call(this.sliderItem);
    this.btnArrow = document.querySelector('.main-slider .arrow');
    this.btnDot = document.querySelector('.main-slider .each');

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
      if (this.activeNum === this.movies.length) {
        this.activeNum = 0;
      }
    } else if (direction === 'left') {
      this.activeNum -= 1;
      if (this.activeNum < 0) {
        this.activeNum = this.movies.length - 1;
      }
    } else {
      this.activeNum = direction;
    }
  }

  autoFn() {
    this.autoPlay = setInterval(() => {
      this.currentMovieNumberInit('right');
    }, this.timer);
  };

  nextMovie(direct: string) {
    this.sliderDirect = direct;

    this.currentMovieNumberInit(this.sliderDirect);
    clearInterval(this.autoPlay);
    this.autoFn();
  }

  selectMovie(target: number) {
    this.currentMovieNumberInit(target);
    clearInterval(this.autoPlay);
    this.autoFn();
  }
}
