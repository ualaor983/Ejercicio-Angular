export interface TerrariaIngredient {
  name: string;
  quantity: number;
}

export interface TerrariaRecipe {
  ingredients: TerrariaIngredient[];
  station: string;
}

export interface TerrariaUsedInRecipe {
  result: string;
  quantity: number;
}

export interface TerrariaItem {
  name: string;
  item_id: number;
  recipe: TerrariaRecipe | null;
  used_in_recipes: TerrariaUsedInRecipe[];
}
