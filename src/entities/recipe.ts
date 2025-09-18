export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  cookTimeMinutes: number;
  servings: number;
  cuisine: string;
  caloriesPerServing: number;
  rating: number;
  mealType: string[];
}
