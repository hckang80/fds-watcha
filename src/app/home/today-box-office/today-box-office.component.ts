import { Component, OnInit } from '@angular/core';
import { BoxOfficePagenationService } from '../box-office-pagenation.service';

@Component({
  selector: 'today-box-office',
  templateUrl: './today-box-office.component.html',
  styleUrls: ['./today-box-office.component.scss']
})
export class TodayBoxOfficeComponent implements OnInit {
  flag = true;
  constructor(
    public boxOfficePage: BoxOfficePagenationService
  ) {}

  ngOnInit() {
    this.boxOfficePage.loadTopFive();
  }
}

