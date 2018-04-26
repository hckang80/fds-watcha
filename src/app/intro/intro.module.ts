import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IntroComponent, ModalPrivate } from './intro.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    ModalPrivate
  ],
  declarations: [
    IntroComponent,
    ModalPrivate
  ],
  exports: [
    IntroComponent,
    ModalPrivate
  ]
})
export class IntroModule { }
