import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from 'src/app/shared/data.service';
import { IngredientModel, IngredientResponse } from '../models/ingredient.model';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  public Ingredients: Observable<IngredientModel[]>;

  constructor(private dataService: DataService) {
    this.Ingredients = dataService.getIngredientsNoPaging().pipe(
      map(res => (<IngredientResponse>res.body).Ingredients)
    );
  }
}
