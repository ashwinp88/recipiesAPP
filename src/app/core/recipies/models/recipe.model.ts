import { IngredientModel } from './ingredient.model';
import { UnitOfMeasurementModel } from './unit-of-measurement.model';

export class RecipeModel {
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
        public Recipe: RecipeModel,
        public Ingredient: IngredientModel,
        public UnitsOfMeasurement: UnitOfMeasurementModel,
        public Quantity: number
    ) {}
}

export class RecipeStep {
    constructor(
        public Recipe_: RecipeModel,
        public Step: Number,
        public StepTitle: string,
        public StepInstructions: string,
        public TimeSpanHours: number,
        public TimeSpanMinutes: number
    ) {}
}

export class RecipeImageModel {
    constructor(
        public ImageType: number,
        public seq: number,
        public ImageApplyID: number,
        public ImageLocation: string
    ) {}
}

export class CreateRecipeModel {
    constructor(
        public Recipe_: RecipeModel,
        public RecipeImage_: RecipeImageModel,
        public RecipeIngredients_: RecipeIngredient,
        public RecipeSteps_: RecipeStep
    ) {}
}

export class RecipeSearchResult {
    constructor(
        public UserRecipeBookMarks: any[],
        public UserRecipeRatings: any[],
        public Recipe: RecipeModel,
        public RecipeImage: RecipeImageModel,
        public RecipeDirections: RecipeStep[],
        public RecipeIngredients: RecipeIngredient[]
    ) {}

}
