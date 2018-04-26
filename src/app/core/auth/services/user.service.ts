import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';
import { AuthService } from './auth.service';

import { environment } from '../../../../environments/environment';

@Injectable()
export class UserService {
  appUrl = environment.apiUrl;
  user = environment.user;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getUsers(): Observable<User> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `token ${token}`);
    return this.http.get<User>(`${this.appUrl}/members/detail`, { headers })
      .shareReplay();
  }

}
