import { Component, OnInit, Input } from '@angular/core';
import { RecipeModel } from '../models/recipe.model';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css']
})
export class RecipieListComponent implements OnInit {
  @Input() recipeList: { Recipe: RecipeModel, ImageLocation: string}[];

  constructor() { }

  ngOnInit() {
  }

}
