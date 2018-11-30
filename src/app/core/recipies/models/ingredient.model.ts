export class IngredientModel {
   constructor(public ID: number, public Description: string) {
   }
}

export class IngredientResponse {
   constructor(public Ingredients: IngredientModel[], public Length: number ) {
   }
}
