import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../core/auth/services/auth.service';
import { PreloaderService } from '../../shared/preloader';
// import { MoviePoster } from '../../shared/movie-poster.interface';

@Component({
  selector: 'app-watched-movies',
  templateUrl: './watched-movies.component.html',
  styleUrls: ['./watched-movies.component.scss']
})
export class WatchedMoviesComponent implements OnInit {
  moviePosters: any;

  url = 'https://justdo2t.com/api/members/3/watched-movie/';
  constructor(
    public http: HttpClient,
    private auth: AuthService,
    public preloader: PreloaderService
  ) { }

  ngOnInit() {
    this.preloader.show();
    this.auth.getToken();
    // console.log('token', this.auth.getToken());
    this.http.get(this.url, { headers: { Authorization: 'token 2abf6e7d296b948c0c906a41f61d3d2cf942e677'}})
      .subscribe(res => {
        setTimeout(() => {
          this.moviePosters = res.watched;
          this.preloader.hide();
        }, 2000);
      });
  }
}
