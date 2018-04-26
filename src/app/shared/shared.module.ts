import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormGroup } from '@angular/forms';

import { HeaderComponent, ModalEditProfile } from './header/header.component';
import { FooterComponent, ModalPrivate } from './footer/footer.component';
import { BoxOfficeRankingComponent } from './box-office-ranking/box-office-ranking.component';
import { MovieCategoryComponent } from './movie-category/movie-category.component';
import { MoviePosterComponent } from './movie-poster/movie-poster.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { PreloaderComponent } from './preloader';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { MovieDetailDialogComponent } from './movie-detail-dialog/movie-detail-dialog.component';

import { MovieCategoryService } from './movie-category/movie-category.service';
import { MovieDetailDialogService } from '../core/movie-detail-dialog.service';
import { CommnetDialogService } from '../core/comment-dialog.service';
import { SearchService } from '../core/search.service';

import { MembersFilterPipe } from './members-filter.pipe';
import { CommasNumbersPipe } from './commas-numbers.pipe';
import { DDayPrintPipe } from './d-day-print.pipe';
import { NationPrintPipe } from './nation-print.pipe';
import { FilmRatePrintPipe } from './film-rate-print.pipe';
import { ModifiedDatePrintPipe } from './modified-date-print.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    ModalEditProfile,
    CommentDialogComponent,
    ModalPrivate
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    BoxOfficeRankingComponent,
    MovieCategoryComponent,
    ModalEditProfile,
    MoviePosterComponent,
    MovieDetailComponent,
    PreloaderComponent,
    CommentDialogComponent,
    MovieDetailDialogComponent,
    ModalPrivate,
    MembersFilterPipe,
    CommasNumbersPipe,
    DDayPrintPipe,
    NationPrintPipe,
    FilmRatePrintPipe,
    ModifiedDatePrintPipe
  ],
  providers: [
    MovieCategoryService,
    MovieDetailDialogService,
    CommnetDialogService,
    SearchService
  ],
  exports: [
    BoxOfficeRankingComponent,
    HeaderComponent,
    MovieCategoryComponent,
    FooterComponent,
    MoviePosterComponent,
    ModalEditProfile,
    MovieDetailComponent,
    PreloaderComponent,
    MovieDetailDialogComponent,
    MembersFilterPipe,
    CommasNumbersPipe,
    DDayPrintPipe,
    NationPrintPipe,
    FilmRatePrintPipe,
    ModifiedDatePrintPipe,
    ModalPrivate
  ]
})
export class SharedModule {}
