import type { Recipe } from '@/types';
import type { Column } from '@/types/table';
import { GenericPage } from './GenericPage';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <GenericPage<Recipe>
      title="Recipes"
      resource="recipes"
      columns={columns}
      onRowClick={(c) => navigate(`/recipes/${c.id}`)}
    />
  );
}
