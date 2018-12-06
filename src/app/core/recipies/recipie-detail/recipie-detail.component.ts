import { Component, OnInit, Input } from '@angular/core';
import { RecipeSearchResult } from '../models/recipe.model';

@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrls: ['./recipie-detail.component.css']
})
export class RecipieDetailComponent implements OnInit {
  @Input() recipe: RecipeSearchResult;
  displayColumns: string[] = ['ingredient', 'qty', 'measure'];
  constructor() { }

  ngOnInit() {
    // console.log(this.recipe);
  }

}
