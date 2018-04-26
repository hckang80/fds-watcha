import { Injectable, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth/services/auth.service';
import { MovieDetailDialogService } from './movie-detail-dialog.service';

import { MovieDetail } from '../shared/movie-detail.interface';
import { BoxofficeMovie } from '../shared/boxoffice-movie.interface';

@Injectable()
export class MovieDetailService {
  appUrl = environment.apiUrl;
  renderer: Renderer2;
  el: ElementRef;
  modal = false;
  message: string;
  movie: MovieDetail;
  commetRating: number;
  type: string;
  starRate: number[] = [];
  starMin = .5;
  starMax = 5;
  starIncrease = .5;

  boxOfficeMovie;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private movieDetailDialogService: MovieDetailDialogService
  ) {
    for (let i = this.starMin; i <= this.starMax; i += this.starIncrease) {
      this.starRate = this.starRate.concat(i);
    }
  }

  mainMovie(id: number): Observable<MovieDetail> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${token}`);
    return this.http.get<MovieDetail>(`${this.appUrl}/movie/${id}/`, { headers })
      .shareReplay();
  }


  movieDetail(id: number) {
    const token = this.auth.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${token}`);
    this.http.get<MovieDetail>(`${this.appUrl}/movie/${id}/`, { headers })
      .subscribe(
        movie => {
          this.movie = movie;
          console.log('[Movie]', this.movie);
          this.modal = true;
          this.movieDetailDialogService.modal = false;
          this.renderer.setAttribute(document.body, 'class', 'modal-open');
        },
        ({ error }) => {
          console.log('ERROR', error.message);
          this.message = error.message;
        }
      );
  }

  close(target) {
    if ( target.className !== 'movie-detail' ) return;
    this.modal = !this.modal;
    this.renderer.setAttribute(document.body, 'class', null);
  }

  getBoxOfficeDetail(): Observable<BoxofficeMovie> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${token}`);
    return this.http.get<BoxofficeMovie>(`${this.appUrl}/movie/box-office/`, { headers })
      .shareReplay();
  }
}

