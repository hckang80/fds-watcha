import { Component, OnInit, Input } from '@angular/core';

import { MovieCategory } from './movie-category.interface';

import { MovieCategoryService } from '../movie-category/movie-category.service';

@Component({
  selector: 'movie-category',
  templateUrl: './movie-category.component.html',
  styleUrls: ['./movie-category.component.scss']
})
export class MovieCategoryComponent implements OnInit {
  @Input() movieListLength;
  @Input() page: string;
  movieCategoryLists: MovieCategory[];
  el: any;

  constructor(public category: MovieCategoryService) {
    this.movieCategoryLists = [
      { genre: 'top-korea', category: '국내 누적관객수 TOP 영화', active: true },
      { genre: 'million-seller', category: '역대 100만 관객 돌파 영화', active: false },
      { genre: 'top-world', category: '전세계 흥행 TOP 영화', active: false },
      { genre: 'hero', category: '슈퍼 히어로 영화', active: false },
      { genre: 'sports', category: '스포츠', active: false },
      { genre: 'family', category: '가족', active: false },
      { genre: 'action', category: '액션', active: false },
      { genre: 'crime', category: '범죄', active: false },
      { genre: 'drama', category: '드라마', active: false },
      { genre: 'comedy', category: '코미디', active: false },
      { genre: 'romance', category: '로맨스/멜로', active: false },
      { genre: 'thriller', category: '스릴러', active: false },
      { genre: 'roco', category: '로맨틱코미디', active: false },
      { genre: 'war', category: '전쟁', active: false },
      { genre: 'fantasy', category: '판타지', active: false },
      { genre: 'sf', category: 'SF', active: false },
      { genre: 'animation', category: '애니메이션', active: false },
      { genre: 'documentary', category: '다큐멘터리', active: false },
      { genre: 'classic', category: '고전', active: true },
      { genre: 'horror', category: '공포', active: false },
      { genre: 'western', category: '서부', active: false },
      { genre: 'musical', category: '뮤지컬', active: false },
      { genre: 'martial-arts', category: '무협', active: false },
      { genre: 'mistery', category: '미스터리', active: false },
      { genre: 'cult', category: '컬트', active: false },
    ];
  }

  changeCategory(genre, pageName) {
    console.log(pageName, 'page이름?');
    this.category.changeCategory(genre, pageName);
    this.movieCategoryLists.map(category => {
      if (genre === category.genre) {
        category.active = true;
      } else {
        category.active = false;
      }
    });
    const offsetY = pageName === 'home' ? 
      window.pageYOffset + document.querySelector('.theme-area').getBoundingClientRect().top - 60
      : window.pageYOffset + document.querySelector('.theme-area').getBoundingClientRect().top - 150;
    window.scroll({ top: offsetY, behavior: 'smooth' });
  }
  scrollTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
  ngOnInit() { }
}

