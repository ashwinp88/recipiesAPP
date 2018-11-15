import { Component, OnInit, ViewChild } from '@angular/core';

import { faUser, faUtensils, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/shared/auth-service.service';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faUtensils = faUtensils;
  faBars = faBars;
  faCircle = faCircle;
  faSearch = faSearch;
  lookInItems: string[];
  lookInCaption: string;
  selectedItems: string[];
  @ViewChild('dropDown') 'dropDown': NgbDropdown;

  constructor(public authService: AuthService, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.lookInItems = ['Author', 'Description', 'Ingredients', 'Content'];
    this.lookInCaption = 'Include';
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
    console.log(this.activeRoute);
  }
}
