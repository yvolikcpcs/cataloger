import type { Recipe } from '@/types';
import type { DetailField } from '../GenericDetailsPage';
import { GenericDetailsPage } from '../GenericDetailsPage';

const fields: DetailField<Recipe>[] = [
  { key: 'id' },
  { key: 'name' },
  { key: 'ingredients' },
  { key: 'instructions' },
  { key: 'cookTimeMinutes', label: 'Cook time minutes' },
  { key: 'servings' },
  { key: 'cuisine' },
  { key: 'caloriesPerServing', label: 'Calories per serving' },
  { key: 'rating' },
  { key: 'mealType' },
];

export default function UserDetailsPage() {
  return (
    <GenericDetailsPage<Recipe>
      resource="recipes"
      title="Recipy details"
      fields={fields}
      backTo="/recipes"
    />
  );
}
