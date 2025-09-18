import type { Recipe } from '@/entities';
import type { DetailField } from '@/features/catalog';
import { GenericDetailsPage } from '@/features/catalog';

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
