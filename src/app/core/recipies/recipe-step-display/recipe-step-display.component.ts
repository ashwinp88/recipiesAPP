import { Component, OnInit, Input } from '@angular/core';
import { RecipeStep } from '../models/recipe.model';
import { faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipe-step-display',
  templateUrl: './recipe-step-display.component.html',
  styleUrls: ['./recipe-step-display.component.css']
})
export class RecipeStepDisplayComponent implements OnInit {
@Input() recipeStep: RecipeStep;
faClock = faClock;
  constructor() { }

  ngOnInit() {
  }

}
