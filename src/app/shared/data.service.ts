import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { AuthService } from './auth-service.service';
import { Observable } from 'rxjs';
import { IngredientModel } from '../core/recipies/models/ingredient.model';
import { UnitOfMeasurementModel } from '../core/recipies/models/unit-of-measurement.model';
import { RecipeModel, CreateRecipeModel } from '../core/recipies/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private APIUrl = 'http://localhost:59797';
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

  getIngredientsNoPaging() {
    const url = `${this.APIUrl}/api/Ingredients/`;
    return this.httpClient.get(url, { headers: this.httpHeader, observe: 'response' });
  }

  getIngredientsByName(ingredient: string, pageSize: string, pageNumber: string) {
    const url = `${this.APIUrl}/api/Ingredients/${ingredient}`;
    const httpParameters: HttpParams = new HttpParams().set(
      'pageSize', pageSize).set(
      'pageNumber', pageNumber);
    return this.httpClient.get(url, { headers: this.httpHeader,  observe: 'response', params: httpParameters });
  }

  editIngredient(ingredient: IngredientModel) {
    const url = `${this.APIUrl}/api/Ingredients/${ingredient.ID}`;
    return this.httpClient.put(url, ingredient, { headers: this.httpHeader });
  }

  deleteIngredient(id: number) {
    const url = `${this.APIUrl}/api/Ingredients/${id}`;
    return this.httpClient.delete(url, { headers: this.httpHeader });
  }

  addUOM(description: string, abbreviation: string) {
    const postBody = { 'Description': description, 'Abbreviation': abbreviation };
    return this.httpClient.post(this.APIUrl + '/api/UnitsOfMeasure', postBody, { headers: this.httpHeader });
  }

  getAllUOM(pageSize: string, pageNumber: string) {
    const url = `${this.APIUrl}/api/UnitsOfMeasure/`;
    const httpParameters: HttpParams = new HttpParams().set(
      'pageSize', pageSize).set(
      'pageNumber', pageNumber);
    return this.httpClient.get(url, { headers: this.httpHeader, observe: 'response', params: httpParameters });
  }

  getAllUOMNoPaging() {
    const url = `${this.APIUrl}/api/UnitsOfMeasure/`;
    return this.httpClient.get(url, { headers: this.httpHeader, observe: 'response' });
  }

  getUOMByName(name: string, pageSize: string, pageNumber: string) {
    const url = `${this.APIUrl}/api/UnitsOfMeasurements/${name}`;
    const httpParameters: HttpParams = new HttpParams().set(
      'pageSize', pageSize).set(
      'pageNumber', pageNumber);
    return this.httpClient.get(url, { headers: this.httpHeader,  observe: 'response', params: httpParameters });
  }

  editUOM(unitOfMEasurement: UnitOfMeasurementModel) {
    const url = `${this.APIUrl}/api/UnitsOfMeasure/${unitOfMEasurement.ID}`;
    return this.httpClient.put(url, unitOfMEasurement, { headers: this.httpHeader });
  }

  deleteUOM(id: number) {
    const url = `${this.APIUrl}/api/UnitsOfMeasure/${id}`;
    return this.httpClient.delete(url, { headers: this.httpHeader });
  }

  addRecipe(recipe: CreateRecipeModel) {
    return this.httpClient.post(this.APIUrl + '/api/Recipes', recipe, {headers: this.httpHeader});
  }

  searchRecipesByTitle(searchQ: string) {
    const httpParameters: HttpParams = new HttpParams().set(
      'title', searchQ);
    return this.httpClient.get(this.APIUrl + '/api/Recipes/Search', {headers: this.httpHeader, params: httpParameters});
  }
}
