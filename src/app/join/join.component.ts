import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  userForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl('', [
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

  get username() {
    return this.userForm.get('username');
  }

  get nickname() {
    return this.userForm.get('nickname');
  }

  get password() {
    return this.userForm.get('password');
  }

  onSubmit() {
    console.log(this.userForm);
    // this.loginForm.reset();
  }

  gotoLogin() {
    this.router.navigate(['login']);
  }
}
