import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ThemeMovies } from '../shared/theme-movies.interface';

@Component({
  selector: 'theme-movies',
  templateUrl: './theme-movies.component.html',
  styleUrls: ['./theme-movies.component.scss']
})
export class ThemeMoviesComponent implements OnInit {

  @Input() themeMovies: ThemeMovies[];

  constructor(
    public router: Router
  ) { }

  ngOnInit() { }

}
