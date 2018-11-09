import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/auth-service.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css']
})
export class RecipiesComponent implements OnInit {
  faSearch = faSearch;
  lookInItems: string[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.lookInItems = ['Author', 'Description', 'Ingredients', 'Content'];
  }

}
