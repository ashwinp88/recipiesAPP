import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { AuthService } from './auth-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private APIUrl = 'http://localhost:50647';
  private httpHeader: HttpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.authToken}`
    }
  );

  constructor(private authService: AuthService, private httpClient: HttpClient) { }
  addIngredient(ingredient: string) {
    const postBody = { 'Description': ingredient };
    return this.httpClient.post(this.APIUrl + '/api/Ingredients', postBody, { headers: this.httpHeader });
  }

  getAllIngredients(pageSize: string, pageNumber: string) {
    const url = `${this.APIUrl}/api/Ingredients/`;
    const httpParameters: HttpParams = new HttpParams().set(
      'pageSize', pageSize).set(
      'pageNumber', pageNumber);
    return this.httpClient.get(url, { headers: this.httpHeader, observe: 'response', params: httpParameters });
  }

  getIngredientsByName(ingredient: string, pageSize: string, pageNumber: string) {
    const url = `${this.APIUrl}/api/Ingredients/${ingredient}`;
    const httpParameters: HttpParams = new HttpParams().set(
      'pageSize', pageSize).set(
      'pageNumber', pageNumber);
    return this.httpClient.get(url, { headers: this.httpHeader,  observe: 'response', params: httpParameters });
  }

  editIngredient(ingredient: {ID: number, Description: string}) {
    const url = `${this.APIUrl}/api/Ingredients/${ingredient.ID}`;
    return this.httpClient.put(url, ingredient, { headers: this.httpHeader });
  }

  deleteIngredient(id: number) {
    const url = `${this.APIUrl}/api/Ingredients/${id}`;
    return this.httpClient.delete(url, { headers: this.httpHeader });
  }
}
