import { Component, OnInit, HostListener } from '@angular/core';
import { RecipeSearchResult, RecipeModel } from '../models/recipe.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LoadingScreenComponent } from '../../loading-screen/loading-screen.component';

@Component({
  selector: 'app-recipies-search',
  templateUrl: './recipies-search.component.html',
  styleUrls: ['./recipies-search.component.css']
})
export class RecipiesSearchComponent implements OnInit {

  recipeList: RecipeSearchResult[];
  loadingRef: MatDialogRef<any>;

  constructor(private activeRoute: ActivatedRoute, private dataService: DataService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.recipeList = [];
    this.activeRoute.queryParams.subscribe(
      (val) => {
        if (val['searchQ']) {
          this.dataService.searchRecipesByTitle(val['searchQ']).subscribe(
            (results: RecipeSearchResult[]) => {
              this.recipeList = results;
              this.closeLoading();
              // console.log(results);
              /* this.recipeList = results.map(
                res => {
                  return { Recipe: res.Recipe, ImageLocation: res.RecipeImage ? res.RecipeImage.ImageLocation : '' };
                }
              ); */
            },
            () => this.closeLoading()
          );
          this.showLoading();
        }
      }
    );
  }

  showLoading() {
   setTimeout(() => {
    this.loadingRef = this.dialog.open( LoadingScreenComponent );
   });
  }

  closeLoading() {
    if (this.loadingRef) {
      this.loadingRef.close();
    }
  }
}
