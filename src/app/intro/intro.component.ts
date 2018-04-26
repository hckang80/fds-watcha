import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AuthService } from '../core/auth/services/auth.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  message: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  socialSignin(provider: string) {
    this.auth.socialSignin(provider)
      .subscribe(
        () => this.router.navigate(['']),
        ({ error }) => this.message = error.message
    );
  }

  openPrivacy() {
    const dialogRef = this.dialog.open(ModalPrivate, {
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'modal-private',
  templateUrl: 'modal-private.html',
})
export class ModalPrivate { }
