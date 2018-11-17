import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private APIUrl = 'http://localhost:50647';

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  addIngredient(ingredient: string) {
    const httpHeader: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.authToken}`
      }
    );
    const postBody = { 'Description': ingredient };
    return this.httpClient.post(this.APIUrl + '/api/Ingredients', postBody, { headers: httpHeader });
  }
}
