import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../core/auth/services/auth.service';
import { PreloaderService } from '../../shared/preloader';

import { MoviePoster } from '../../shared/movie-poster.interface';
import { UserInfo } from '../../shared/user-info.interface';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-watched-movies',
  templateUrl: './watched-movies.component.html',
  styleUrls: ['./watched-movies.component.scss']
})
export class WatchedMoviesComponent implements OnInit {
  rateScore = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  moviePosters: object;
  userInfo: object;
  appUrl = environment.apiUrl;

  constructor(
    public http: HttpClient,
    private auth: AuthService,
    public preloader: PreloaderService,
  ) { }

  ngOnInit() {
    this.preloader.show();
    this.http.get<UserInfo>(`${this.appUrl}/members/detail`,
      { headers: { Authorization: `Token ${this.auth.getToken()}` } })
      .subscribe(user => {
        this.http.get<MoviePoster>(`${this.appUrl}/members/${user.pk}/watched-movie/`,
          { headers: { Authorization: `Token ${this.auth.getToken()}` } })
          .subscribe(res => {
              this.moviePosters = res.results;
              this.preloader.hide();
          });
      });
  }
}
