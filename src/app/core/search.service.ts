import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth/services/auth.service';
import { PreloaderService } from '../shared/preloader';

import { MoviePoster } from '../shared/movie-poster.interface';

import { environment } from '../../environments/environment';

@Injectable()
export class SearchService {

  moviePosters: object;
  // data: object;
  movieTitle: string;
  count: number;
  appUrl = environment.apiUrl;

  constructor(
    public http: HttpClient,
    private auth: AuthService,
    public preloader: PreloaderService
  ) { }

  searchMovie(movieTitle) {
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.auth.getToken()}`);
    this.http.get<MoviePoster>(`${this.appUrl}/movie/search/?movie=${movieTitle}`,
    { headers })
    .subscribe(res => {
      this.moviePosters = res.results;
      // this.data = res;
      this.movieTitle = movieTitle;
      this.count = res.count;
      this.preloader.hide();
    });
  }
  get getMovieTitle() {
    return this.movieTitle;
  }
  get getCount() {
    return this.count;
  }
}
