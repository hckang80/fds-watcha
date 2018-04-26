import { Component, Renderer2, ElementRef } from '@angular/core';

import { MovieDetailService } from './core/movie-detail.service';
import { MovieDetailDialogService } from './core/movie-detail-dialog.service';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>

  <ng-container *ngIf="movieDetailService.modal">
    <movie-detail></movie-detail>
  </ng-container>

   <ng-container *ngIf="movieDetailDialogService.modal">
     <movie-detail-dialog></movie-detail-dialog>
   </ng-container>
  `
})

export class AppComponent {
  constructor(
    public movieDetailService: MovieDetailService,
    public movieDetailDialogService: MovieDetailDialogService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    movieDetailService.renderer = renderer;
    movieDetailService.el = el;
    movieDetailDialogService.renderer = renderer;
    movieDetailDialogService.el = el;
  }
}