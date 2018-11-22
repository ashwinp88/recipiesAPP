export class Ingredient {
   constructor(public ID: number, public Description: string) {
   }
}

export class IngredientResponse {
   constructor(public Ingredients: Ingredient[], public Length: number ) {
   }
}
