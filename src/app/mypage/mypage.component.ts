import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PreloaderService } from '../shared/preloader';

import { environment } from '../../environments/environment.prod';

import { AuthService } from '../core/auth/services/auth.service';
import { UserService } from '../core/auth/services/user.service';

import { UserInfo } from '../shared/user-info.interface';
import { Mypageuser } from './mypageuser.interface';
import { MoviePoster } from '../shared/movie-poster.interface';

interface CommentedMovieList {
  count: number;
  next?: string;
  previous?: string;
  results?: [
    {
      id: number;
      title_ko: string;
      title_en: string;
      nation: string;
      poster_image_m: string;
      poster_image_my_x3: string;
      genre: [
        {
          id: number,
          genre: string
        }
      ],
      running_time: string,
      commented_user: {
        id: number,
        user_want_movie: boolean,
        user_watched_movie: boolean,
        rating: number,
        comment: string,
        user: number,
        movie: number,
      }
    }
  ];
}

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})

export class MypageComponent implements OnInit {
  userInfo: UserInfo;
  myPageUser: Mypageuser;
  pk: number;
  appUrl = environment.apiUrl;
  wishlistCount: number;
  watchedMoviesCount: number;
  commentListCount: number;

  constructor(
    public http: HttpClient,
    private auth: AuthService,
    private user: UserService,
    public preloader: PreloaderService
  ) { }

  mypageHead(): Observable<Mypageuser> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${token}`);
    return this.http.get<Mypageuser>(`${this.appUrl}/members/${this.pk}/mypage-top/`, { headers })
      .shareReplay();
  }

  wishlist(): Observable<MoviePoster> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${token}`);
    return this.http.get<MoviePoster>(`${this.appUrl}/members/${this.pk}/want-movie/`, { headers })
      .shareReplay();
  }
  
  watchedMovies() {
    const token = this.auth.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${token}`);
    return this.http.get<MoviePoster>(`${this.appUrl}/members/${this.pk}/watched-movie/`, { headers })
      .shareReplay();
  }

  commentList() {
    return this.http.get<CommentedMovieList>(`${this.appUrl}/members/${this.pk}/commented-movie/`)
  }

  ngOnInit() {
    this.preloader.show();
    this.user.getUsers()
      .subscribe(user => {
        this.pk = user.pk;
        this.mypageHead()
          .subscribe(res => {
            this.myPageUser = res;
            this.preloader.hide();
          });
      });

    this.user.getUsers()
      .subscribe(user => {
        this.pk = user.pk;
        this.wishlist()
          .subscribe(res => {
            this.wishlistCount = res.count;
          });
      });
      
    this.user.getUsers()
      .subscribe(user => {
        this.pk = user.pk;
        this.watchedMovies()
          .subscribe(res => {
            this.watchedMoviesCount = res.count;
          });
      });

    this.user.getUsers()
      .subscribe(user => {
        this.pk = user.pk;
        this.commentList()
          .subscribe(res => {
            this.commentListCount = res.count;
          });
      });
  }
}
