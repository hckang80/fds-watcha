import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { JoinModule } from './join/join.module';
import { IntroModule } from './intro/intro.module';
import { SearchModule } from './search/search.module';
import { MypageModule } from './mypage/mypage.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { AuthService } from './core/auth/services/auth.service';
import { SocialAuthService } from './core/auth/services/social-auth.service';
import { UserService } from './core/auth/services/user.service';
import { MovieDetailService } from './core/movie-detail.service';
import { PreloaderService } from './shared/preloader';

import { CommnetDialogService } from './core/comment-dialog.service';

import { AuthGuard } from './core/auth/guards/auth.guard';
import { JwtHelper } from 'angular2-jwt';
import { MovieDetailDialogService } from './core/movie-detail-dialog.service';
import { BoxofficeComponent } from './boxoffice/boxoffice.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { EvalmoreComponent } from './evalmore/evalmore.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxofficeComponent,
    RecommendationComponent,
    EvalmoreComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    LoginModule,
    JoinModule,
    IntroModule,
    SearchModule,
    MypageModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    AuthService,
    SocialAuthService,
    UserService,
    AuthGuard,
    JwtHelper,
    MovieDetailService,
    PreloaderService,
    CommnetDialogService,
    MovieDetailDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
