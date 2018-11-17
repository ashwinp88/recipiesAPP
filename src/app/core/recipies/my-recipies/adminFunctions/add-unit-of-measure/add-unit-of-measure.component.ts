import { Component, OnInit } from '@angular/core';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-unit-of-measure',
  templateUrl: './add-unit-of-measure.component.html',
  styleUrls: ['./add-unit-of-measure.component.css']
})
export class AddUnitOfMeasureComponent implements OnInit {
  faSearch = faSearch;
  faPlus = faPlus;
  constructor() { }

  ngOnInit() {
  }

}
