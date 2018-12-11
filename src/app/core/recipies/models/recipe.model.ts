import { IngredientModel } from './ingredient.model';
import { UnitOfMeasurementModel } from './unit-of-measurement.model';

export class RecipeModel {
    public ID: number;
    constructor(
        public Title: string,
        public Description: string,
        public CreatedByUser: string,
        public Complete: boolean,
        public TotalTimeNeededHours?: number,
        public TotalTimeNeededMinutes?: number,
        public AverageRecipeRating?: number
    ) {}
}

export class RecipeIngredient {
    constructor(
        public Recipe: RecipeModel,
        public Ingredient: IngredientModel,
        public UnitOfMeasurement: UnitOfMeasurementModel,
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
        public RecipeIngredients_: RecipeIngredient[],
        public RecipeSteps_: RecipeStep[]
    ) {}
}

export class RecipeSearchResult {
    constructor(
        public UserRecipeBookMarks: number,
        public UserRecipeComments: number,
        public Recipe: RecipeModel,
        public RecipeImage: RecipeImageModel,
        public RecipeDirections: RecipeStep[],
        public RecipeIngredients: RecipeIngredient[]
    ) {}
}

export class RecipeComment {
    public userName: string;
    public commentedOn: Date;
    public comment: string;
    public recipeID: number;
}
