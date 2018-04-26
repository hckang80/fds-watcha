import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyMoviesComponent } from '../../home/my-movies/my-movies.component';

import { AuthService } from '../../core/auth/services/auth.service';
import { environment } from '../../../environments/environment';

import { MovieList, Movie } from './movie-category.interface';

@Injectable()
export class MovieCategoryService {
  appUrl = environment.apiUrl;
  sort = 'genre';
  moviePosters: Movie[];
  nextUrl: string;

  constructor(public http: HttpClient, public authService: AuthService) {}
  changeCategory(category, page) {
    this.sort = ['top-korea', 'million-seller', 'hero', 'sports', 'family', 'top-world'].indexOf(category) === -1 ? 'genre' : 'tag';
    const headers = new HttpHeaders()
      .set('Authorization', `token ${this.authService.getToken()}`);
    const pageUrl = page === 'eval' ? 'movie/eval' : 'movie';

    this.http.get<MovieList>(`${this.appUrl}/${pageUrl}/${this.sort}/${category}/`, { headers } )
      .subscribe(res => {
        this.nextUrl = res.next;
        this.moviePosters = res.results;
      });
  }
  defaultCategory(page) {
    const headers = new HttpHeaders()
      .set('Authorization', `token ${this.authService.getToken()}`);
    const pageUrl = page === 'eval' ? 'movie/eval' : 'movie';

    this.http.get<MovieList>(`${this.appUrl}/${pageUrl}/tag/top-korea/`, { headers } )
      .subscribe(res => {
        this.moviePosters = res.results;
      });
  }
}
