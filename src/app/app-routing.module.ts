import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  HomeComponent,
  IntroComponent,
  LoginComponent,
  JoinComponent,
  SearchComponent,
  BoxofficeComponent,
  EvalmoreComponent,
  RecommendationComponent,
  MypageComponent,
  UserTasteComponent,
  WishlistComponent,
  CommentsComponent,
  WatchedMoviesComponent
  // PreloaderComponen
} from './pages';

import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'preloader', component: PreloaderComponent },
  { path: 'intro', component: IntroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'join', component: JoinComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'boxoffice', component: BoxofficeComponent, canActivate: [AuthGuard] },
  { path: 'evalmore', component: EvalmoreComponent, canActivate: [AuthGuard] },
  { path: 'recommendation', component: RecommendationComponent, canActivate: [AuthGuard] },
  {
    path: 'mypage', component: MypageComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'wishlist', pathMatch: 'full' },
      { path: 'userTaste', component: UserTasteComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'Watched', component: WatchedMoviesComponent },
      { path: 'comments', component: CommentsComponent }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
