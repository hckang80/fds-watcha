import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../core/auth/services/auth.service';
import { PreloaderService } from '../../shared/preloader';

import { MoviePoster } from '../../shared/movie-poster.interface';
import { UserInfo } from '../../shared/user-info.interface';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  userInfo: object;
  moviePosters: object[];
  appUrl = environment.apiUrl;

  constructor(
    public http: HttpClient,
    private auth: AuthService,
    public preloader: PreloaderService
  ) { }

  ngOnInit() {
    this.preloader.show();
    this.auth.getToken();
    this.http.get<UserInfo>(`${this.appUrl}/members/detail`,
      { headers: { Authorization: `Token ${this.auth.getToken()}` } })
      .subscribe(user => {
        this.http.get<MoviePoster>(`${this.appUrl}/members/${user.pk}/want-movie/`,
          { headers: { Authorization: `Token ${this.auth.getToken()}` } })
          .subscribe(res => {
            this.moviePosters = res.results;
            this.preloader.hide();
          });
      });
  }
}
