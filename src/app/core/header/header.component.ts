import { Component, OnInit, ViewChild, ElementRef, HostListener, OnChanges, OnDestroy } from '@angular/core';

import { faUser, faUtensils, faBars, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/shared/auth-service.service';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  faUser = faUser;
  faUtensils = faUtensils;
  faBars = faBars;
  faCircle = faCircle;
  faSearch = faSearch;
  faPlus = faPlus;
  lookInItems: string[];
  lookInCaption: string;
  selectedItems: string[];
  @ViewChild('dropDown') 'dropDown': NgbDropdown;
  @ViewChild('search') searchField: ElementRef;
  isRecipiesPath$: Observable<boolean>;
  captionsVisible = true;
  menuOpen = false;
  subscription: Subscription;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.lookInItems = ['Author', 'Title', 'Ingredients', 'Content'];
    this.lookInCaption = 'Include';
    this.selectedItems = ['Title'];
    this.isRecipiesPath$ = this.router.events.pipe(filter(event => event instanceof NavigationStart)).pipe(
                              map(navigation => navigation['url'])
                            ).pipe(
                              map(url => url.toString().includes('recipes'))
                            );
    this.subscription = this.router.events.subscribe(
      () => this.menuOpen = false
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  onClickMenuItem(eventData, elemmentRef) {
    eventData.stopPropagation();
    elemmentRef.checked = !elemmentRef.checked;
  }

  onSearch() {
    const searchBoxValue = this.searchField.nativeElement.value;
    if (searchBoxValue && searchBoxValue.length >= 3) {
      this.router.navigate(['/recipes', 'search'], { queryParams: { searchQ : searchBoxValue, lookIn: this.selectedItems}});
    }
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.showHideCaptions();
  }

  showHideCaptions() {
    if (window.innerWidth <= 1200 && window.innerWidth > 768) {
      this.captionsVisible = false;
    } else {
      this.captionsVisible = true;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
