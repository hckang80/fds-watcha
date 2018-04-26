import { Component, OnInit } from '@angular/core';

import { PreloaderService } from '../shared/preloader';
import { SearchService } from '../core/search.service';

import { MoviePoster } from '../shared/movie-poster.interface';

import { environment } from '../../environments/environment';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    public preloader: PreloaderService,
    public search: SearchService
  ) { }

  ngOnInit() {
    this.preloader.show();
  }
}
