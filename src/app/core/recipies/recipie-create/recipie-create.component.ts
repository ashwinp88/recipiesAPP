import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipie-create',
  templateUrl: './recipie-create.component.html',
  styleUrls: ['./recipie-create.component.css']
})
export class RecipieCreateComponent implements OnInit {
  imageLocation: string;
  ingredients: string[];
  constructor() { }

  ngOnInit() {
    this.imageLocation = '';
    this.ingredients = ['a', 'b'] ;
  }

}
