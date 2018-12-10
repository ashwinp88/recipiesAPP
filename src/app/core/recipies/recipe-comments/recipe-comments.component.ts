import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RecipeComment } from '../models/recipe.model';
import { AuthService } from 'src/app/shared/auth-service.service';
import { DataService } from 'src/app/shared/data.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LoadingScreenComponent } from '../../loading-screen/loading-screen.component';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-recipe-comments',
  templateUrl: './recipe-comments.component.html',
  styleUrls: ['./recipe-comments.component.css']
})
export class RecipeCommentsComponent implements OnInit {
  @Input() comments: RecipeComment[];
  @Input() recipeID: number;
  @ViewChild('f') commentForm: NgForm;
  loadingRef: MatDialogRef<any>;

  constructor(public authService: AuthService, private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  postComment() {
    if (this.commentForm.valid) {
      const comment = new RecipeComment();
      comment.comment = this.commentForm.controls['comment'].value;
      comment.recipeID = this.recipeID;
      comment.userName = this.authService.uID;
      this.dataService.postRecipeComment(comment).subscribe(
        () => this.openThankYouModal(),
        () => this.openErrorModal()
      );
      this.showLoading();
    } else {
      this.commentForm.controls['comment'].markAsTouched();
    }
  }

  showLoading() {
    this.loadingRef = this.dialog.open( LoadingScreenComponent );
  }

  closeLoading() {
    if (this.loadingRef != null) {
      this.loadingRef.close();
    }
  }

  openErrorModal() {
    this.closeLoading();
    this.dialog.open( DialogComponent, { data: {
      Title: 'Error posting your comment!',
      Body: 'Something went wrong. Please try again in a moment.',
      OkBtnCaption: 'OK',
      CancelBtnCaption: 'Cancel',
      CancelBtnVisible : false
    } });
  }

  openThankYouModal() {
    this.closeLoading();
    this.dialog.open( DialogComponent, { data: {
      Title: 'Thank you for your feedback!',
      Body: 'Thank you for your contribution to the community.',
      OkBtnCaption: 'OK',
      CancelBtnCaption: 'Cancel',
      CancelBtnVisible : false
    } });
  }

}
