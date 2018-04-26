import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { PreloaderService } from '../../shared/preloader';
import { UserService } from '../../core/auth/services/user.service';

export interface CommentedMovieList {
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
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  moviePosters: any;
  appUrl = environment.apiUrl;
  rateScore = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    public http: HttpClient,
    public preloader: PreloaderService,
    private user: UserService
  ) { }

  ngOnInit() {
    this.preloader.show();
    this.user.getUsers().subscribe( userInfo => {
      this.http.get<CommentedMovieList>(`${this.appUrl}/members/${userInfo.pk}/commented-movie/`)
        .subscribe(res => {
        this.moviePosters = res.results;
        this.moviePosters.map(movie => movie.login_user_checked = movie.commented_user);
        console.log(this.moviePosters);
        this.preloader.hide();
      });
    });
  }
}
