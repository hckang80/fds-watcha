import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../core/auth/services/user.service';
import { CommnetDialogService } from '../../core/comment-dialog.service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  constructor(public dialog: CommnetDialogService) {}
  ngOnInit() {}
}
