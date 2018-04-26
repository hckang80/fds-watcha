import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { AuthService } from '../core/auth/services/auth.service';


export interface BoxofficeDetail {
  count: number;
  next?: string;
  previous?: string;
  results: [
    {
      id: number,
      title_ko: string,
      ticketing_rate: number,
      rating_avg: number,
      poster_image: string,
      members: [
          {
          type: string,
          member: number,
          name: string,
          real_name: string
          }
        ]
    }
  ];
}
@Injectable()
export class BoxOfficePagenationService {
  appUrl = environment.apiUrl;
  nextUrl: string;
  httpHeader = {'headers': { 'Authorization' : `token ${this.authService.getToken()}`} };
  todayBoxOffice;
  constructor(public http: HttpClient, public authService: AuthService) { }
  next(): void {
    this.http.get<BoxofficeDetail>(this.nextUrl, this.httpHeader)
    .subscribe(res => {
      this.nextUrl = res.next;
      this.todayBoxOffice = [...this.todayBoxOffice, ...res.results];
    });
  }

  loadTopFive(): void {
    this.http.get<BoxofficeDetail>(`${this.appUrl}/movie/box-office/five-list/`, this.httpHeader)
    .subscribe(res => {
      this.todayBoxOffice = res.results;
      this.nextUrl = res.next;
    });
  }
}
