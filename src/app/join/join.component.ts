import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth/services/auth.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  userForm: FormGroup;
  message: string;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}')
      ]),
      nickname: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      agree1: new FormControl('', [
        Validators.requiredTrue
      ]),
      agree2: new FormControl('', [
        Validators.requiredTrue
      ])
    });
    console.log(this.userForm);
  }

  get email() {
    return this.userForm.get('email');
  }

  get nickname() {
    return this.userForm.get('nickname');
  }

  get password() {
    return this.userForm.get('password');
  }

  signup() {
    console.log('[payload]', this.userForm.value);
    this.auth.signup(this.userForm.value)
      .subscribe(
        () => this.router.navigate(['login']),
        ({ error }) => {
          console.log('ERROR', error.message);
          this.message = error.message;
        }
      );
  }

  socialSignin(provider: string) {
    this.auth.socialSignin(provider)
      .subscribe(
        () => this.router.navigate(['']),
        ({ error }) => this.message = error.message
      );
  }
}
