import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { User } from '../core/auth/models/user';

import { AuthService } from '../core/auth/services/auth.service';
import { UserService } from '../core/auth/services/user.service';
export interface UserWatched {
  count: number;
  next?: null;
  previous?: null;
  results: [
    {
      id: number;
      title_ko: string;
      title_en: string;
      rating_avg: string;
      nation: string;
      poster_image_m: string;
      poster_image_my_x3: string;
      genre: [
        {
          id: number;
          genre: string;
        }
      ];
      running_time: number;
      login_user_checked: {
        id: number;
        user_want_movie: boolean;
        user_watched_movie: boolean;
        rating: string;
        comment: string;
        user: number;
        movie: number;
      };
    }
  ];
}

@Component({
  selector: 'app-evalmore',
  templateUrl: './evalmore.component.html',
  styleUrls: ['./evalmore.component.scss']
})
export class EvalmoreComponent implements OnInit {
  watchedCount;
  countBarPercent: number;
  movieListLength = 24;
  page = 'eval';
  appUrl = environment.apiUrl;


  constructor(public user: UserService, public http: HttpClient, private authService: AuthService) {
     const headers  = new HttpHeaders()
      .set('Authorization', `token ${this.authService.getToken()}`);
    this.user.getUsers().subscribe( userInfo => {
      this.http.get<UserWatched>(`${this.appUrl}/members/${userInfo.pk}/watched-movie/`, { headers } )
        .subscribe( res => {
          this.changeCount(res.count);
        });
    });
  }

  changeCount(count) {
    // watchedCount는 user의 res.count를 참조한다.
    // 평가가 될떄, 취소될때 마다 바뀌어야함
    // 자식으로부터 평가하는 이벤트를 캐치해서, 그 이벤트가 발생할때마다 특정 함수를 실행시킨다 = >user의 count를 가져온다.
    this.watchedCount = count;
    if (this.watchedCount >= 0 && this.watchedCount <= 100) {
      this.countBarPercent = this.watchedCount / 100;
    } else if (this.watchedCount > 100 && this.watchedCount <= 500) {
      this.countBarPercent = this.watchedCount / 500;
    } else if (this.watchedCount > 500 && this.watchedCount <= 1000) {
      this.countBarPercent = this.watchedCount / 1000;
    } else if (this.watchedCount > 1000 && this.watchedCount <= 10000) {
      this.countBarPercent = this.watchedCount / 10000;
    }
  }
  ngOnInit() {
  }
}
