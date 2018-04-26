import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../core/auth/services/auth.service';

import { environment } from '../../../environments/environment';

import { BoxofficeRanking } from './box-office-ranking.interface';

@Component({
  selector: 'box-office-ranking',
  templateUrl: './box-office-ranking.component.html',
  styleUrls: ['./box-office-ranking.component.scss']
})
export class BoxOfficeRankingComponent implements OnInit {
  boxOfficeRankingLists: object;

  appUrl = environment.apiUrl;
  httpHeader = {'headers': { 'Authorization' : `token ${this.authSevice.getToken()}`} };

  constructor(
    public http: HttpClient,
    private authSevice: AuthService
  ) {
    this.http.get<BoxofficeRanking>(`${this.appUrl}/movie/box-office/name-list/`,
      { headers: { Authorization: `token ${this.authSevice.getToken()}` } })
      .subscribe(res => {
        this.boxOfficeRankingLists = res;
      });
  }

  ngOnInit() {}
}
