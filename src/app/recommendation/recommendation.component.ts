import { Component, OnInit } from '@angular/core';
import { BoxOfficePagenationService } from '../home/box-office-pagenation.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {

  constructor(public boxOfficePage: BoxOfficePagenationService) { }

  ngOnInit() {
    this.boxOfficePage.loadTopFive();
  }

}
