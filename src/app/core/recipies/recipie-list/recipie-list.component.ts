import { Component, OnInit, Input, HostListener } from '@angular/core';
import { RecipeSearchResult } from '../models/recipe.model';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css']
})
export class RecipieListComponent implements OnInit {
  @Input() recipeList: RecipeSearchResult[];
  briefDescMaxChars = 30;
  constructor() { }

  ngOnInit() {
    this.setCharsSize();
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.setCharsSize();
  }

  setCharsSize() {
    if (window.innerWidth <= 576) {
      this.briefDescMaxChars = 30;
    }
    if (window.innerWidth > 576 && window.innerWidth <= 768) {
      this.briefDescMaxChars = 45;
    }
    if (window.innerWidth > 768 && window.innerWidth <= 992) {
      this.briefDescMaxChars = 65;
    }
    if (window.innerWidth > 992 && window.innerHeight <= 1200) {
      this.briefDescMaxChars = 100;
    }
    if (window.innerWidth > 1200) {
      this.briefDescMaxChars = 130;
    }
  }
}
