import { Component, OnInit } from '@angular/core';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {
  faSearch = faSearch;
  faPlus = faPlus;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onAddIngredient(ingredient: string) {
    this.dataService.addIngredient(ingredient).subscribe(
      (val) => console.log(val),
      (val) => console.log('2' + val),
      () => console.log('done ? ')
    );
  }

}
