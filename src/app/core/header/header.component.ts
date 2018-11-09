import { Component, OnInit } from '@angular/core';

import { faUser, faUtensils, faBars } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/shared/auth-service.service';

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

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
