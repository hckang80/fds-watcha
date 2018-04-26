import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth/services/auth.service';
import { UserService } from '../../core/auth/services/user.service';
import { SearchService } from '../../core/search.service';

import { MoviePoster } from '../../shared/movie-poster.interface';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  appUrl = environment.apiUrl;
  resultState = false;
  state = true;
  message: string;
  searchString: string;
  id: number;
  email: string;
  nickName: string;
  moviePosters: object;
  data: object;

  constructor(
    public http: HttpClient,
    public router: Router,
    private auth: AuthService,
    private user: UserService,
    public search: SearchService,
    public dialog: MatDialog
  ) { }

  @ViewChild('searchResult1') results: ElementRef;

  @HostListener('window:scroll')
  checkScroll() {
    if (!document.querySelector('.main-section')) return;
    const componentPosition = document.querySelector('.main-section').getBoundingClientRect().top + window.pageYOffset;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= componentPosition) {
      this.state = false;
    } else {
      this.state = true;
    }
  }

  moveFocus(event) {
    if (event.target.nodeName === 'INPUT' && event.keyCode === 40) {
      this.results.nativeElement.focus();
    } else if (event.target.nodeName === 'A') {
      event.preventDefault();
      if (event.keyCode === 38) {
        event.target.previousElementSibling.focus();
      } else if (event.keyCode === 40) {
        event.target.nextElementSibling.focus();
      }
    } else {
      const headers = new HttpHeaders()
        .set('Authorization', `Token ${this.auth.getToken()}`);
      this.http.get<MoviePoster>(`${this.appUrl}/movie/search/?movie=${this.searchString}`,
        { headers })
        .subscribe(res => {
          this.moviePosters = res.results;
          this.data = res;
        });
    }
  }

  moveToSearch(movieTitle) {
    this.search.searchMovie(movieTitle);
  }

  closeResult(event) {
    this.resultState = this.searchString === '' ? false : true;
  }

  ngOnInit() {
    this.searchString = '';

    this.user.getUsers()
      .subscribe(
        user => {
          console.log(user);
          this.id = user.pk;
          this.email = user.email;
          this.nickName = user.nickname;
        },
        ({ error }) => {
          console.log('ERROR', error.message);
          this.message = error.message;
        }
      );
  }

  signout() {
    this.auth.signout();
  }

  modifyProfile() {
    const dialogRef = this.dialog.open(ModalEditProfile, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(payload => {
      console.log(`Dialog result: ${payload}`);
      this.auth.userEdit(payload)
        .subscribe(
          () => {},
          ({ error }) => {
            console.log('ERROR', error.message);
            this.message = error.message;
          }
        );
    });
  }
}

@Component({
  selector: 'modal-edit-profile',
  templateUrl: 'modal-edit-profile.html',
  styleUrls: ['./modal-edit-profile.scss']
})

export class ModalEditProfile {
  userForm: FormGroup;
  message: string;
  imgSrc: string;
  files: FileList;

  id: number;
  email: string;
  nickName: string;

  constructor(
    private auth: AuthService,
    private user: UserService
  ) { }

  ngOnInit() {
    this.user.getUsers()
      .subscribe(
        user => {
          console.log(user);
          this.id = user.pk;
          this.email = user.email;
          this.nickName = user.nickname;
        },
        ({ error }) => {
          console.log('ERROR', error.message);
        this.message = error.message;
        }
      );
  }

  getFiles(event) {
      this.files = event.target.files;
      console.log('[this.files]', this.files[0]);
  }


  photoChange(event) { 
    console.log('[photoChange]', this.files[0]);
    this.auth.photoChange(this.files[0])
      .subscribe(
        () => {},
        ({ error }) => {
          console.log('ERROR', error.message);
          this.message = error.message;
        }
      );
  }

  // photoChange(src) {
  //   this.auth.photoChange(src)
  //     .subscribe(
  //       () => {},
  //       ({ error }) => {
  //         console.log('ERROR', error.message);
  //         this.message = error.message;
  //       }
  //     );
  // }

  // userEdit(payload) {
  //   this.auth.userEdit(payload)
  //     .subscribe(
  //       () => {},
  //       ({ error }) => {
  //         console.log('ERROR', error.message);
  //         this.message = error.message;
  //       }
  //     );
  // }
}
