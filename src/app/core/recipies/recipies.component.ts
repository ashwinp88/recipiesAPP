import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth-service.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css']
})
export class RecipiesComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
