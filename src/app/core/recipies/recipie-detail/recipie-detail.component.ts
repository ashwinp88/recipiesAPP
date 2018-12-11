import { Component, OnInit, Input } from '@angular/core';
import { RecipeSearchResult } from '../models/recipe.model';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/auth-service.service';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrls: ['./recipie-detail.component.css']
})
export class RecipieDetailComponent implements OnInit {
  @Input() recipe: RecipeSearchResult;
  displayColumns: string[] = ['ingredient', 'qty', 'measure'];
  faHeart = faHeart;
  faSolidHeart = faSolidHeart;
  isRecipeBookmarked = false;

  constructor(public authService: AuthService, private dataService: DataService) { }

  ngOnInit() {
    if (this.authService.isAuthorized) {
      this.dataService.isUserRecipeBookMarked(this.recipe.Recipe.ID, this.authService.uID).subscribe(
        (val: boolean) => this.isRecipeBookmarked = val
      );
    }
  }

  bookMarkRecipe() {
    this.dataService.toggleRecipeBookmark(this.recipe.Recipe.ID, this.authService.uID).subscribe(
      (val: boolean) => this.isRecipeBookmarked = val
    );
  }
}
