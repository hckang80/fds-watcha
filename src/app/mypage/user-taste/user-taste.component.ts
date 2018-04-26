import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgWordCloudData, AgWordCloudModule } from 'angular4-word-cloud';

import { UserInfo } from '../../shared/user-info.interface';
import { Mypageuser } from '../mypageuser.interface';
import { environment } from '../../../environments/environment';

import { PreloaderService } from '../../shared/preloader';
import { UserService } from '../../core/auth/services/user.service';
import { AuthService } from '../../core/auth/services/auth.service';

export interface UserRating {

    pk: 5;
    email: string;
    nickname: string;
    rating_eval: {
        total_rating_count: number,
        total_rating: number,
        user_avg_rating: number,
        rating_5_0: number,
        rating_4_5: number,
        rating_4_0: number,
        rating_3_5: number,
        rating_3_0: number,
        rating_2_5: number,
        rating_2_0: number,
        rating_1_5: number,
        rating_1_0: number,
        rating_0_5: number
    };
    nation_statistics: Object;
    genre_statistics: Object;

}
@Component({
  selector: 'app-user-taste',
  templateUrl: './user-taste.component.html',
  styleUrls: ['./user-taste.component.scss']
})
export class UserTasteComponent implements OnInit {
  pageShow = false;
  ratingTotal = 0;
  ratingAvg = 0;
  totalRuntime;

  appUrl = environment.apiUrl;
  userAnalsys;
  topGenre;
  topNation;
  topGenreRating: any[];
  topNationName: string[] = [];
  topNationRating: number[] = [];
  topNationWatched: number[] = [];
  rateDataList: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // nation
  public doughnutChartLabels: string[] = ['', '', ''];
  public doughnutChartData: number[] = [1, 2, 3];
  public doughnutChartType = 'doughnut';
  doughnutChartWidth = 460;
  doughnutChartHeight = 320;
  public doughnutChartOptions: any = {
    responsive: true,
    legend: {display: false},
    cutoutPercentage: 70, // 굵기
    elements: { arc: { borderWidth: 0 } }, // 외곽선,
    width: 460
  };
  private doughnutChartColors: any[] = [{backgroundColor: ['#ffc2c2', '#fa6a69', '#fb9b9b']}];


  // rating-graph
  public lineChartData: Array<any> = [
          { data: [0, ...this.rateDataList, 0], label: '내 별점' }
        ];
  public lineChartLabels: Array<any> = [ null, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, null];
  public lineChartOptions: any = {
    responsive: true,
    devicePixelRatio: 4,
    scales: {
      xAxes: [{ gridLines: { display: false }, display: false }], // 그리드삭제
      yAxes: [{ gridLines: { display: false }, display: false }] // 그리드삭제
    },
    legend: { display: false },
    elements: { point: { radius: 0 } }
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: '#FFEB3B', // 배경색
      borderColor: 'rgba(0,0,0, 0)', // 외곽선 색
      borderWidth: 0, // 외곽선
      lineTension: .01 // 그래프 곡선률
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';


  // word cloud
  public wordData: Array<AgWordCloudData>;
  // Word Cloud Options
  public WordCloudOptions = {
    settings: {
      minFontSize: 50,
      maxFontSize: 100,
    },
    margin: {
      top: 10,
      bottom: 10,
    },
    labels: false
  };
  randomSize() {
    return Math.floor(Math.random() * 20) + 15;
  }

  constructor( public http: HttpClient, public preloader: PreloaderService, private user: UserService, private auth: AuthService) {}
  sortByRating(statistics: object, kind: string) {
    for ( const key of Object.keys(statistics) ) {
      const key2 = `${key}`.toLowerCase();
      if (statistics[`${key}`][`${key2}_rating`] === null) {
        delete statistics[`${key}`];
      }
    }
    let sorted = Object.entries(statistics).map(item => {
      const ObjectKey = item[0].toLowerCase();
      const rating = item[1][`${ObjectKey}_rating`].toFixed();
      const count = item[1][`${ObjectKey}_count`];
      return [ObjectKey, rating, count];
    });
    sorted = sorted.sort((a, b) => {
      return a[1] < b[1] ? 1 : -1;
    });
    sorted = kind === '장르' ? this.genreTransformToKor(sorted) : this.nationTransformToKor(sorted);
    return sorted;
  }



  genreTransformToKor(arr) {
    for (let i = 0; i < arr.length; i++) {
      switch (arr[i][0]) {
        case 'action' : arr[i][0] = '액션';
        break;
        case 'roco' : arr[i][0] = '로맨틱코미디';
        break;
        case 'mistery' : arr[i][0] = '미스터리';
        break;
        case 'crime' : arr[i][0] = '범죄';
        break;
        case 'thriller' : arr[i][0] = '스릴러';
        break;
        case 'drama' : arr[i][0] = '드라마';
        break;
        case 'family' : arr[i][0] = '가족';
        break;
        case 'animation' : arr[i][0] = '애니메이션';
        break;
        case 'romance' : arr[i][0] = '로맨스';
        break;
        case 'fantasy' : arr[i][0] = '판타지';
        break;
        case 'comedy' : arr[i][0] = '코미디';
        break;
        case 'documentary' : arr[i][0] = '다큐멘터리';
        break;
        case 'adventure' : arr[i][0] = '모험';
        break;
        case 'suspense' : arr[i][0] = '서스펜스';
        break;
        case 'horror' : arr[i][0] = '호러';
        break;
        case 'blackcomedy' : arr[i][0] = '블랙코미디';
        break;
        case 'sf' : arr[i][0] = 'SF';
        break;
        case 'war' : arr[i][0] = '전쟁';
        break;
        case 'musical' : arr[i][0] = '뮤지컬';
        break;
        case 'noir' : arr[i][0] = '느와르';
        break;
        case 'narrative' : arr[i][0] = '서사';
        break;
        case 'martial_arts' : arr[i][0] = '무술';
        break;
      }
    }
    return arr;
  }

  nationTransformToKor(arr) {
    for (let i = 0; i < arr.length; i++) {
      switch (arr[i][0]) {
        case 'kr' : arr[i][0] = '한국';
        break;
        case 'us' : arr[i][0] = '미국';
        break;
        case 'gb' : arr[i][0] = '영국';
        break;
        case 'jp' : arr[i][0] = '일본';
        break;
        case 'ch' : arr[i][0] = '중국';
        break;
        case 'hk' : arr[i][0] = '홍콩';
        break;
        case 'fr' : arr[i][0] = '프랑스';
        break;
        case 'gm' : arr[i][0] = '독일';
        break;
        case 'it' : arr[i][0] = '이탈리아';
        break;
        case 'th' : arr[i][0] = '가족';
        break;
      }
    }
    return arr;
  }
  getRating() {

  }

  ngOnInit() {
    console.log(this.lineChartData);
    this.preloader.show();
    const token = this.auth.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `token ${token}`);
    this.user.getUsers().subscribe( userInfo => {
      this.http.get<UserRating>(`${this.appUrl}/members/${userInfo.pk}/rating/`, {headers})
        .subscribe(res => {
        this.userAnalsys = res;
        console.log(this.userAnalsys);
        this.ratingAvg = this.userAnalsys.rating_eval.user_avg_rating;
        this.ratingTotal = this.userAnalsys.rating_eval.total_rating_count;
        this.rateDataList = (Object.values(this.userAnalsys.rating_eval)).slice(3, 14);
        this.lineChartData[0].data = [null , ...this.rateDataList, null];
        console.log(Object.values(this.userAnalsys.rating_eval).slice(3, Object.values(this.userAnalsys.rating_eval).length));
        this.topGenre = this.sortByRating(res.genre_statistics, '장르').slice(0, 3);
        this.topNation = this.sortByRating(res.nation_statistics, '국가').slice(0, 3);
        this.topGenreRating = [this.topGenre[0][1], this.topGenre[1][1], this.topGenre[2][1]];
        this.doughnutChartData = [this.topGenre[0][2], this.topGenre[1][2], this.topGenre[2][2]];
        this.preloader.hide();
        this.pageShow = true;
      });
    });
    this.wordData = [
      {size: 20, text: '스릴있는'},
      {size: 20, text: '공포'},
      {size: 20, text: '미래배경'},
      {size: 20, text: '2인조'},
      {size: 20, text: '히어로'},
      {size: 20, text: '마블'},
    ];

    this.http.get<UserInfo>(`${this.appUrl}/members/detail`, { headers })
      .subscribe(user => {
        this.http.get<Mypageuser>(`${this.appUrl}/members/${user.pk}/mypage-top/`, { headers })
          .subscribe(res => {
            this.totalRuntime = res.total_running_time;
          });
      });
  }
}
