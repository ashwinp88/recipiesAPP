import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthService } from 'src/app/shared/auth-service.service';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css']
})
export class RecipiesComponent implements OnInit {
  @ViewChild('dropDown') 'dropDown': NgbDropdown;
  faSearch = faSearch;
  faBars = faBars;
  lookInItems: string[];
  lookInCaption: string;
  selectedItems: string[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.lookInItems = ['Author', 'Description', 'Ingredients', 'Content'];
    this.lookInCaption = 'Include in search results';
    this.selectedItems = [];
  }

  onLookInChange(elem: HTMLInputElement, checked: boolean) {
    this.dropDown.open();
    if (!this.selectedItems.includes(elem.value, 0) && checked) {
      this.selectedItems.push(elem.value);
    } else {
      this.selectedItems.splice(this.selectedItems.indexOf(elem.value), 1);
    }
    if (this.selectedItems.length > 0) {
      this.lookInCaption = `Looking in ${this.selectedItems.toString()}`;
    } else {
      this.lookInCaption = 'Include in search results';
    }
  }
}
