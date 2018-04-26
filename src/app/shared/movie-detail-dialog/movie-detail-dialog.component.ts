import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MovieDetailDialogService } from '../../core/movie-detail-dialog.service';
import { MovieDetailService } from '../../core/movie-detail.service';
import { AuthService } from '../../core/auth/services/auth.service';

import { MovieMemberDetail } from '../../shared/movie-detail-dialog/movie-member-detail.interface';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'movie-detail-dialog',
  templateUrl: './movie-detail-dialog.component.html',
  styleUrls: ['./movie-detail-dialog.component.scss']
})
export class MovieDetailDialogComponent implements OnInit {
  dialog: Element;
  movieDetail: Element;
  moviePosters: object;
  movieMemberDetail: MovieMemberDetail;
  posterSmall = true;

  appUrl = environment.apiUrl;

  constructor(
    public http: HttpClient,
    private auth: AuthService,
    private el: ElementRef,
    private renderer: Renderer2,
    public movieDetailDialogService: MovieDetailDialogService,
    public movieDetailService: MovieDetailService
  ) { }

  ngOnInit() {
    this.dialog = document.querySelector('.director-dialog');
    this.renderer.setStyle(this.dialog, 'top', `${window.scrollY}px`);
  //   const headers = new HttpHeaders()
  //   .set('Authorization', `Token ${this.auth.getToken()}`);
  //   this.http.get<MovieMemberDetail>(`${this.appUrl}/movie-members/14/`,
  //   { headers })
  //   .subscribe(res => {
  //     console.log(2);
  //     this.movieMemberDetail = res;
  //     console.log('res', this.movieMemberDetail);
  //     this.movieDetail = document.querySelector('.director-dialog');
  //     this.renderer.setStyle(this.movieDetail, 'top', `${window.scrollY}px`);
  //     });
  }

  // getDirectedMovieCount(): number {
  //   return this.movieMemberDetail.by_director_movie_list.length;
  // }

  // getStarringMovieCount(): number {
  //   return this.movieMemberDetail.by_main_actor_movie_list.length;
  // }
}
