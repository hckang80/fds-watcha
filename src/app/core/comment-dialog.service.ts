import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CommentDialogComponent } from '../shared/comment-dialog/comment-dialog.component';
import { MoviePoster } from '../shared/movie-poster.interface';
import { environment } from '../../environments/environment';
import { CheckMovie } from '../shared/check-movie.interface';
import { UserActionResponse } from '../shared/userActionResponse.interface';

import { AuthService } from './auth/services/auth.service';
import { UserService } from './auth/services/user.service';

export interface ShortMoviePoster {
  id: number;
  title_ko: string;
  title_en: string;
  rating_avg: number;
  nation: string;
  poster_image: string;
  genre: [
    {
      id: number;
      genre: string;
    }
  ];
  running_time: number;
  login_user_checked?: {
    id: number;
    user_want_movie: boolean;
    user_watched_movie: boolean;
    rating: string;
    comment: string;
    user: number;
    movie: number;
  };
}

@Injectable()
export class CommnetDialogService {
  moviePoster: ShortMoviePoster;
  appUrl = environment.apiUrl;
  userAction: CheckMovie;
  isWriteComment: boolean;
  constructor(public dialog: MatDialog, public http: HttpClient, private user: UserService, public authService: AuthService ) {}

  getMovie(movie: ShortMoviePoster) {
    this.moviePoster = movie;
    console.log(this.moviePoster);
  }

  writeComment(userComment, moviePk, userInfo ) {
    console.log(userInfo);
    this.userAction = {
      movie: moviePk,
      rating: userInfo.rating,
      user_want_movie: false,
      comment: userComment,
      id: userInfo.id
    };
    const headers = new HttpHeaders()
    .set('Authorization', `token ${this.authService.getToken()}`)
    .set('Content-Type', 'application/json');
    this.http.put<UserActionResponse>(`${this.appUrl}/movie/user-checked-movie/${this.userAction.id}/`, this.userAction, { headers })
      .subscribe(res => {
        this.moviePoster.login_user_checked.comment = res.comment;
      });
    this.isWriteComment = true;
  }
}
