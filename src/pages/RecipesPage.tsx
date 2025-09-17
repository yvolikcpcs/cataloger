import type { Recipe } from '@/types';
import type { Column } from '@/types/table';
import { GenericPage } from './GenericPage';

const columns: Column<Recipe>[] = [
  { key: 'id', isSortable: true },
  { key: 'name', isSortable: true },
  { key: 'ingredients' },
  { key: 'instructions' },
  { key: 'cookTimeMinutes', label: 'Cook time minutes' },
  { key: 'servings' },
  { key: 'cuisine' },
  { key: 'caloriesPerServing', label: 'Calories per serving' },
  { key: 'rating' },
  { key: 'mealType' },
];

export default function RecipesPage() {
  return <GenericPage<Recipe> title="Recipes" resource="recipes" columns={columns} />;
}
