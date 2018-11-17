import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-recipies',
  templateUrl: './my-recipies.component.html',
  styleUrls: ['./my-recipies.component.css']
})
export class MyRecipiesComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
