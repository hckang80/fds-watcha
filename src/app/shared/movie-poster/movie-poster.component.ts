import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';

import { MovieDetailService } from '../../core/movie-detail.service';
import { CommnetDialogService } from '../../core/comment-dialog.service';

import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../../core/auth/services/auth.service';
import { UserService } from '../../core/auth/services/user.service';
import { MatDialog } from '@angular/material';
import { CheckMovie } from '../check-movie.interface';
import { UserActionResponse } from '../userActionResponse.interface';



export interface ShortMoviePoster {
  id: number;
  title_ko: string;
  title_en?: string;
  rating_avg?: number;
  rate?: string;
  nation?: string;
  poster_image?: string;
  poster_image_m?: string;
  poster_image_s?: string;
  genre?: [
    {
      id: number;
      genre: string;
    }
  ];
  running_time?: number;
  login_user_checked?: {
    id: number;
    user_want_movie: boolean;
    user_watched_movie: boolean;
    rating: string;
    comment: string;
    user: number;
    movie: number;
    modified_date?: string;
    created_date?: string;
  };
}

@Component({
  selector: 'movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.scss']
})
export class MoviePosterComponent implements OnInit {
  @Input() moviePoster: ShortMoviePoster;
  @Input() posterSizeLarge: boolean;
  @Input() posterSmall: boolean;

  rateScore = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  userAction: CheckMovie;
  userActionResponse: UserActionResponse;
  apiUrl = environment.apiUrl;
  httpOptions: HttpHeaders;

  rating: number;
  checkedId: number;
  comment: boolean;
  want: boolean;
  watched: boolean;
  userToMovieId: number;

  constructor(
    public http: HttpClient,
    public movieDetailService: MovieDetailService,
    public commnetDialogService: CommnetDialogService,
    public dialog: MatDialog,
    private authService: AuthService,
    private user: UserService
  ) {}

  rateFilm(target, rate, moviePK, InputUserToMovieID) {
    const headers = (this.httpOptions = new HttpHeaders()
      .set('Authorization', `token ${this.authService.getToken()}`)
      .set('Content-Type', 'application/json'));

    this.userAction = {
      movie: moviePK,
      rating: rate,
      user_want_movie: false
    };
    if (this.userToMovieId === 0) {
      // 평가내역이 없다면 내역을 생성한다.
      this.userAction.user_watched_movie = true;

      this.http.post<UserActionResponse>(`${this.apiUrl}/movie/user-checked-movie/create/`, this.userAction, { headers })
        .subscribe(res => {
          this.moviePoster.login_user_checked = res;
          this.want = res.user_want_movie;
          this.rating = +res.rating;
          this.want = res.user_want_movie;
          this.watched = res.user_watched_movie;
          this.userToMovieId = res.id;
        });
    } else if (+this.rating === rate) {
      // 평가한 점수 === 클릭한점수면 별을 삭제한다.
      this.userAction.rating = null;
      this.userAction.user_watched_movie = false;
      this.userAction.id = this.userToMovieId;
      this.user.getUsers().subscribe(res => (this.userAction.user = res.pk));

      this.http.put<UserActionResponse>(`${this.apiUrl}/movie/user-checked-movie/${this.userAction.id}/`, this.userAction, { headers })
        .subscribe(res => {
          this.moviePoster.login_user_checked = res;
          this.want = res.user_want_movie;
          this.rating = null;
        });
    } else if (this.userToMovieId !== 0 && +this.rating !== rate) {
      // 평가한 별점이 존재하는데, 지금 평가한 별점과 다르면 수정한다.
      this.userAction.id = this.userToMovieId;
      this.userAction.user_watched_movie = true;
      this.user.getUsers().subscribe(res => (this.userAction.user = res.pk));

      this.http.put<UserActionResponse>(`${this.apiUrl}/movie/user-checked-movie/${this.userAction.id}/`, this.userAction, { headers })
        .subscribe(res => {
          this.moviePoster.login_user_checked = res;
          this.want = res.user_want_movie;
          this.rating = +res.rating;
        });
    }
  }

  WantMovie(moviePK, InputUserToMovieID, want) {
    console.log('보고싶어요 클릭됨');
    // http클라이언트로 생성 혹은 수정한다.
    const headers = (this.httpOptions = new HttpHeaders()
      .set('Authorization', `token ${this.authService.getToken()}`)
      .set('Content-Type', 'application/json'));
    this.userAction = {
      movie: moviePK,
      rating: null,
      user_watched_movie: false
    };
    if (want === false) {
      if (Object.keys(this.moviePoster.login_user_checked).length === 1) {
        // 생성 api
        this.userAction.user_want_movie = true;
        this.http.post<UserActionResponse>(`${this.apiUrl}/movie/user-checked-movie/create/`, this.userAction, { headers })
          .subscribe(res => {
            this.moviePoster.login_user_checked = res;
            this.want = res.user_want_movie;
            this.rating = null;
            this.userToMovieId = res.id;
          });
      } else {
        // 수정 api
        this.userAction.user_want_movie = true;
        this.userAction.id = InputUserToMovieID;

        this.user.getUsers().subscribe(res => (this.userAction.user = res.pk));
        this.http.put<UserActionResponse>(`${this.apiUrl}/movie/user-checked-movie/${this.userAction.id}/`, this.userAction, { headers })
          .subscribe(res => {
            this.moviePoster.login_user_checked = res;
            this.want = res.user_want_movie;
            this.rating = null;
          });
      }
    } else {
      // 수정 api로 삭제
      this.userAction.user_want_movie = false;
      this.userAction.id = InputUserToMovieID;

      this.user.getUsers().subscribe(res => (this.userAction.user = res.pk));
      this.http.put<UserActionResponse>(`${this.apiUrl}/movie/user-checked-movie/${this.userAction.id}/`, this.userAction, { headers })
        .subscribe(res => {
          this.want = res.user_want_movie;
          this.moviePoster.login_user_checked = res;
          this.userActionResponse = res;
        });
    }
  }

  openDialog(movie) {
    if (Object.keys(movie.login_user_checked).length !== 1 && movie.login_user_checked.user_watched_movie === true) {
      this.commnetDialogService.getMovie(movie);
      const dialogRef = this.dialog.open(CommentDialogComponent, {
        height: '350px'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.comment = this.commnetDialogService.isWriteComment === true ? true : false;
      });
    } else {
      alert('영화 평가를 하지않으면 코멘트를 남길 수 없습니다.');
      return;
    }
  }

  ngOnInit() {
    if (this.moviePoster.login_user_checked) {
      const login_user = this.moviePoster.login_user_checked;
      this.rating = Object.keys(login_user).length === 1 ? 0 : +login_user.rating;
      this.want = Object.keys(login_user).length === 1 ? false : login_user.user_want_movie;
      this.comment = login_user.comment === '' ? false : login_user.user_watched_movie;
      this.userToMovieId = Object.keys(login_user).length === 1 ? 0 : login_user.id;
    }
  }
}
