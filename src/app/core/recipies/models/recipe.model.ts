import { Ingredient } from './ingredient.model';
import { UnitOfMeasurement } from './unit-of-measurement.model';

export class Recipe {
    constructor(
        public Title: string,
        public Description: string,
        public CreatedByUser: string,
        public Complete: boolean,
        TotalTimeNeededHours?: number,
        TotalTimeNeededMinutes?: number,
        AverageRecipeRating?: number
    ) {}
}

export class RecipeIngredient {
    constructor(
        public Recipe_: Recipe,
        public Ingredient_: Ingredient,
        public UnitOfMeasure_: UnitOfMeasurement,
        public Qty: number
    ) {}
}

/* export class RecipeImage {
    constructor(
        public seq: number,

    ) {}
} */
