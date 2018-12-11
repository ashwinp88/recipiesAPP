import { Component, OnInit } from '@angular/core';
import { RecipeSearchResult, RecipeComment } from '../models/recipe.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { AuthService } from 'src/app/shared/auth-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail-item',
  templateUrl: './recipe-detail-item.component.html',
  styleUrls: ['./recipe-detail-item.component.css']
})
export class RecipeDetailItemComponent implements OnInit {
  recipe: RecipeSearchResult;
  recipeComments$: Observable<RecipeComment[]>;
  constructor(private activeRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.recipe = new RecipeSearchResult(null, null, null, null, null, null);
    this.activeRoute.params.subscribe(
      (val) => {
        if (val['id']) {
          this.dataService.getRecipeByID(+val['id']).subscribe(
            (res: RecipeSearchResult) => {
              this.recipe = res;
            }
          );
          this.recipeComments$ = this.dataService.getRecipeComments(+val['id']).pipe(
            map(res => res as RecipeComment[])
          );
        }
      }
    );
  }
}
