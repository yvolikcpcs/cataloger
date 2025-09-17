import type { Recipe } from '@/types';
import type { Column } from '@/types/table';
import { GenericPage } from './GenericPage';
import { useRemoteRepoData } from '@/core/hooks/useRemoteRepoData';

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

export default function RecipiesPage() {
  const { data, loading, error, reload } = useRemoteRepoData<Recipe>('https://dummyjson.com/recipes', 'recipes');
  return <GenericPage<Recipe> title="Recipes" data={data} columns={columns} loading={loading} error={error ?? undefined} onRetry={reload}/>;
}
