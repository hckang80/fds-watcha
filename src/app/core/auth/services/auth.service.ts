import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { environment } from '../../../../environments/environment';

import { User } from '../models/user';
import { Token } from '../models/token';
import { SocialAuthService } from './social-auth.service';

@Injectable()
export class AuthService {
  appUrl = environment.apiUrl;
  TOKEN_NAME = environment.tokenName;
  user = environment.user;

  constructor(
    private http: HttpClient, 
    private jwtHelper: JwtHelper,
    private socialAuth: SocialAuthService
  ) {
    // console.log('[appUrl] ', this.appUrl);
    console.log('[Token] ', this.getToken());
  }

  socialSignin(provider: string): Observable<Token> {
    return this.socialAuth.getSocialCredential(provider)
      .switchMap(credential => {
        // return this.http.post<Token>(`${this.appUrl}/members/facebook-auth-token/`, credential)
        return this.http.post<Token>(`https://himanmen.com/user/facebook-login/`, credential)
      })
      .do(res => this.setToken(res.token))
      .shareReplay();
  }

  photoChange(credential) {
    const token = this.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `token ${token}`);
    credential = { img_profile: credential };
    console.log('[Img_profile]', credential);
    return this.http.patch(`${this.appUrl}/members/img-profile/9/`, credential, { headers })
      .shareReplay();
  }

  userEdit(credential) {
    const token = this.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `token ${token}`);
    return this.http.put(`${this.appUrl}/members/detail/`, credential, { headers })
      .shareReplay();
  }

  signup(credential: User): Observable<Token> {
    return this.http.post<Token>(`${this.appUrl}/members/signup/`, credential)
      .do(res => this.setToken(res.token))
      .shareReplay();
  }

  signin(credential: User): Observable<Token> {
    return this.http.post<Token>(`${this.appUrl}/members/email-auth-token/`, credential)
      .do(res => this.setToken(res.token))
      .shareReplay();
  }

  signout(): void {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // return token ? !this.isTokenExpired(token) : false;
    return !!token;
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.user);
  }
  
  setUser(user) {
    localStorage.setItem(this.user, user);
  }
  /*
    token 유효 기간 체크
    The JwtHelper class has several useful methods that can be utilized in your components:

    decodeToken
    getTokenExpirationDate
    isTokenExpired

    npm install angular2-jwt
    https://github.com/auth0/angular2-jwt
  */
  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }

  getUserid(): string {
    return this.jwtHelper.decodeToken(this.getToken()).userid;
  }
}
