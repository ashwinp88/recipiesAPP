import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { AuthService } from './auth-service.service';
import { IngredientModel } from '../core/recipies/models/ingredient.model';
import { UnitOfMeasurementModel } from '../core/recipies/models/unit-of-measurement.model';
import { CreateRecipeModel, RecipeComment } from '../core/recipies/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  addIngredient(ingredient: string) {
    const postBody = { 'Description': ingredient };
    const httpHeader: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.authToken}`
      });
    return this.httpClient.post(this.authService.APIUrl + '/api/Ingredients', postBody, { headers: httpHeader });
  }

  getAllIngredients(pageSize: string, pageNumber: string) {
    const url = `${this.authService.APIUrl}/api/Ingredients/`;
    const httpParameters: HttpParams = new HttpParams().set(
      'pageSize', pageSize).set(
      'pageNumber', pageNumber);
    return this.httpClient.get(url, { observe: 'response', params: httpParameters });
  }

  getIngredientsNoPaging() {
    const url = `${this.authService.APIUrl}/api/Ingredients/`;
    return this.httpClient.get(url, { observe: 'response' });
  }

  getIngredientsByName(ingredient: string, pageSize: string, pageNumber: string) {
    const url = `${this.authService.APIUrl}/api/Ingredients/${ingredient}`;
    const httpParameters: HttpParams = new HttpParams().set(
      'pageSize', pageSize).set(
      'pageNumber', pageNumber);
    return this.httpClient.get(url, { observe: 'response', params: httpParameters });
  }

  editIngredient(ingredient: IngredientModel) {
    const httpHeader: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.authToken}`
      }
    );
    const url = `${this.authService.APIUrl}/api/Ingredients/${ingredient.ID}`;
    return this.httpClient.put(url, ingredient, { headers: httpHeader });
  }

  deleteIngredient(id: number) {
    const httpHeader: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.authToken}`
      }
    );
    const url = `${this.authService.APIUrl}/api/Ingredients/${id}`;
    return this.httpClient.delete(url, { headers: httpHeader });
  }

  addUOM(description: string, abbreviation: string) {
    const postBody = { 'Description': description, 'Abbreviation': abbreviation };
    const httpHeader: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.authToken}`
      }
    );
    return this.httpClient.post(this.authService.APIUrl + '/api/UnitsOfMeasure', postBody, { headers: httpHeader });
  }

  getAllUOM(pageSize: string, pageNumber: string) {
    const url = `${this.authService.APIUrl}/api/UnitsOfMeasure/`;
    const httpParameters: HttpParams = new HttpParams().set(
      'pageSize', pageSize).set(
      'pageNumber', pageNumber);
    return this.httpClient.get(url, { observe: 'response', params: httpParameters });
  }

  getAllUOMNoPaging() {
    const url = `${this.authService.APIUrl}/api/UnitsOfMeasure/`;
    return this.httpClient.get(url, { observe: 'response' });
  }

  getUOMByName(name: string, pageSize: string, pageNumber: string) {
    const url = `${this.authService.APIUrl}/api/UnitsOfMeasurements/${name}`;
    const httpParameters: HttpParams = new HttpParams().set(
      'pageSize', pageSize).set(
      'pageNumber', pageNumber);
    return this.httpClient.get(url, { observe: 'response', params: httpParameters });
  }

  editUOM(unitOfMEasurement: UnitOfMeasurementModel) {
    const httpHeader: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.authToken}`
      }
    );
    const url = `${this.authService.APIUrl}/api/UnitsOfMeasure/${unitOfMEasurement.ID}`;
    return this.httpClient.put(url, unitOfMEasurement, { headers: httpHeader });
  }

  deleteUOM(id: number) {
    const httpHeader: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.authToken}`
      }
    );
    const url = `${this.authService.APIUrl}/api/UnitsOfMeasure/${id}`;
    return this.httpClient.delete(url, { headers: httpHeader });
  }

  addRecipe(recipe: CreateRecipeModel) {
    const httpHeader: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.authToken}`
      }
    );
    // pattern to replace before sending image data to Web API
    const base64PrefixPatt = /^data:\w{1,}\/\w{1,}\;base64,/g;
    if (recipe.RecipeImage_ && recipe.RecipeImage_.ImageBlob) {
      recipe.RecipeImage_.ImageBlob = recipe.RecipeImage_.ImageBlob.replace(base64PrefixPatt, '');
    }
    return this.httpClient.post(this.authService.APIUrl + '/api/Recipes', recipe, {headers: httpHeader});
  }

  searchRecipesByTitle(searchQ: string) {
    const httpParameters: HttpParams = new HttpParams().set(
      'title', searchQ);
    return this.httpClient.get(this.authService.APIUrl + '/api/Recipes/Search', { params: httpParameters });
  }

  getRecipeByID(id: number) {
    return this.httpClient.get(this.authService.APIUrl + '/api/Recipes/' + id);
  }

  getRecipeComments(recipeId: number) {
    const httpParameters: HttpParams = new HttpParams().set(
      'recipeID', recipeId.toString());
    return this.httpClient.get(this.authService.APIUrl + '/api/Recipes/Comments', { params: httpParameters });
  }

  postRecipeComment(comment: RecipeComment) {
    const httpHeader: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.authToken}`
      }
    );
    return this.httpClient.post(this.authService.APIUrl + '/api/Recipes/Comments', comment, { headers: httpHeader });
  }

  isUserRecipeBookMarked(recipeID: number, uid: string) {
    const httpHeader: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.authToken}`
      }
    );
    const httpParameters: HttpParams = new HttpParams().set(
      'recipeID', recipeID.toString()).set(
        'uid', uid);
    return this.httpClient.get(this.authService.APIUrl + '/api/Recipes/Bookmark', { headers: httpHeader, params: httpParameters });
  }

  toggleRecipeBookmark(recipeID: number, uid: string) {
    const httpHeader: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.authToken}`
      }
    );
    const httpParameters: HttpParams = new HttpParams().set(
      'recipeID', recipeID.toString()).set(
        'uid', uid);
    return this.httpClient.post(this.authService.APIUrl + '/api/Recipes/Bookmark', null, { headers: httpHeader, params: httpParameters });
  }

  getRecentlyAddedRecipes() {
    const httpHeader: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );
    return this.httpClient.get(this.authService.APIUrl + '/api/Recipes/Recent', { headers: httpHeader });
  }

}
