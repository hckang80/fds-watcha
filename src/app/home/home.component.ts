import { Component, OnInit, Renderer2 } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import { PreloaderService } from '../shared/preloader';
import { ThemeMovies } from './shared/theme-movies.interface';
import { BoxOfficePagenationService } from './box-office-pagenation.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  themeMovieList: ThemeMovies[];
  leftPosition = 0;
  targetEl;
  prevBtnShowBoxOffice = false;
  nextBtnShowBoxOffice = true;
  prevBtnShowMyMovies = false;
  nextBtnShowMyMovies = true;
  prevBtnShowTheme = false;
  nextBtnShowTheme = true;

  movieListLength = 13;

  page = 'home';

  constructor(private renderer: Renderer2, public boxOfficePage: BoxOfficePagenationService, public preloader: PreloaderService) {
    this.themeMovieList = [
      { id: 10, link: '', content: '드라마', image: '' },
      { id: 9, link: '', content: '공포', image: '' },
      { id: 8, link: '', content: '로맨스', image: '' },
      { id: 7, link: '', content: '느와르', image: '' },
      { id: 6, link: '', content: '다큐멘터리', image: '' },
      { id: 5, link: '', content: '액션', image: '' },
      { id: 4, link: '', content: '로맨틱 코메디', image: '' },
      { id: 3, link: '', content: '애니메이션', image: '' },
      { id: 2, link: '', content: '로멘스, 멜로', image: '' },
      { id: 1, link: '', content: '스릴러', image: '' }
    ];
  }

  moveTo(target: string, direction: string): void {
    this.targetEl = document.querySelector(`${target} .list-movie`);
    this.leftPosition = +(<HTMLElement>document.querySelector( `${target} .list-movie` )).dataset.position;
    if (direction === 'prev') {
      this.leftPosition += 960;
      this.renderer.setStyle( this.targetEl, 'transform', `translateX(${this.leftPosition}px)` );
      (<HTMLElement>document.querySelector( `${target} .list-movie` )).dataset.position = `${this.leftPosition}`;
    } else if (direction === 'next') {
      this.leftPosition -= 960;
      this.renderer.setStyle( this.targetEl, 'transform', `translateX(${this.leftPosition}px)` );
      (<HTMLElement>document.querySelector( `${target} .list-movie` )).dataset.position = `${this.leftPosition}`;
    }
    switch (target) {
      case 'today-box-office':
        this.prevBtnShowBoxOffice = this.targetEl.dataset.position === '0' ? false : true;
        this.nextBtnShowBoxOffice = this.targetEl.dataset.position === '-960' ? false : true;
        this.boxOfficePage.next();
        break;
      case 'my-movies':
        this.prevBtnShowMyMovies = this.targetEl.dataset.position === '0' ? false : true;
        this.nextBtnShowMyMovies = this.targetEl.dataset.position === '-960' ? false : true;
        break;
      case 'theme-movies':
        this.prevBtnShowTheme = this.targetEl.dataset.position === '0' ? false : true;
        this.nextBtnShowTheme = this.targetEl.dataset.position === '-960' ? false : true;
        break;
    }
  }

  ngOnInit() {
    this.preloader.show();
    this.preloader.hide();
    console.log('show', this.preloader.show());
    console.log('hide', this.preloader.hide());
   }
}
