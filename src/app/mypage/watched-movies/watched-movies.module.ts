import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchedMoviesComponent } from '../../pages';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WatchedMoviesComponent
  ],
  providers: [],
  exports: [
    WatchedMoviesComponent
  ]
})
export class WatchedMoviesModule { }
