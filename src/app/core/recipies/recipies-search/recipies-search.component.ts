import { Component, OnInit } from '@angular/core';
import { RecipeSearchResult, RecipeModel } from '../models/recipe.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipies-search',
  templateUrl: './recipies-search.component.html',
  styleUrls: ['./recipies-search.component.css']
})
export class RecipiesSearchComponent implements OnInit {
  recipeList: Observable<{ Recipe: RecipeModel, ImageLocation: string}[]>;
  // searchResults: Observable<RecipeSearchResult[]>;
  searchQuery: string;
  constructor(private activeRoute: ActivatedRoute, private dataService: DataService) {
    this.recipeList = new Observable<{ Recipe: RecipeModel, ImageLocation: string}[]>();
  }

  ngOnInit() {
    // this.searchResults = new Observable<RecipeSearchResult[]>();
    this.activeRoute.queryParams.subscribe(
      (val) => {
        if (val['searchQ']) {
          this.recipeList = this.dataService.searchRecipesByTitle(val['searchQ']).pipe(
            map(recipeSearchResults => (<RecipeSearchResult[]>recipeSearchResults).
                map(res => {
                  return { Recipe: res.Recipe, ImageLocation: res.RecipeImage ? res.RecipeImage.ImageLocation : '' };
                })
            ));
        }
      }
    );
  }
}
