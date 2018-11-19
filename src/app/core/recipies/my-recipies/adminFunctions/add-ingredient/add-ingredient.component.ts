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

  alertVisible = false;
  alertText = '';
  alertType = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onAddIngredient(ingredient: string) {
    this.dataService.addIngredient(ingredient).subscribe(
      (val) => {
        console.log(val);
        this.alertText = `Added ingredient ${val['Description']}. Record ID returned is ${val['ID']}`;
        this.alertType = 'success';
        this.alertVisible = true;
        setTimeout(
          () => {
            this.alertText = '';
            this.alertType = 'danger';
            this.alertVisible = false;
          }, 1000 * 5);
      },
      (val) => {
        console.log('2' + val);
        this.alertVisible = true;
        this.alertText = 'There was an issue inserting the record.';
        setTimeout(
          () => {
            this.alertVisible = false;
            this.alertText = '';
          }, 1000 * 5);
      }
    );
  }

  searchIngredients(ingredient: string) {
    this.dataService.getIngredientsByName(ingredient).subscribe(
      (val) => console.log(val),
      (val) => console.log(val)
    );
  }

  closeAlert() {
    this.alertText = '';
    this.alertType = '';
    this.alertVisible = false;
  }

}
