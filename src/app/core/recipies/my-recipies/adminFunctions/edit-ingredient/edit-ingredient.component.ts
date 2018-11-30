import { Component, OnInit, Input, Output } from '@angular/core';
import { faSync, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/shared/data.service';
import { Subject } from 'rxjs';

import { IngredientModel } from '../../../models/ingredient.model';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent implements OnInit {
  faSync = faSync;
  faTimes = faTimes;
  @Input() ingredient: IngredientModel;
  @Input() ingredientDeleted: Subject<IngredientModel>;

  private snackBarRef: MatSnackBarRef<any>;

  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onUpdate() {
    if (this.snackBarRef != null) {
      this.snackBarRef.dismiss();
    }
    this.dataService.editIngredient(this.ingredient).subscribe(
      () => {
        this.snackBarRef = this.snackBar.open('Updated record.', 'Dismiss', { duration: 1000 * 5 });
      },
      () => {
        this.snackBarRef = this.snackBar.open('Something went wrong!', 'Dismiss', { duration: 1000 * 5 });
      }
    );
  }

  onDelete() {
    if (this.snackBarRef != null) {
      this.snackBarRef.dismiss();
    }
    this.dataService.deleteIngredient(this.ingredient.ID).subscribe(
      () => this.ingredientDeleted.next(this.ingredient),
      () => {
        this.snackBarRef = this.snackBar.open('Something went wrong!', 'Dismiss', { duration: 1000 * 5 });
      }
    );
  }
}
