# How to Add a New Entity

> Example: `Movie`

## 1) Define the entity type
```ts
export interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  durationMin: number;
  genres: string[];
  rating?: number;
}
```
Export in `src/entities/index.ts`:
```ts
export * from './movie';
```

## 2) List Page
```tsx
const columns: Column<Movie>[] = [
  { key: 'id', isSortable: true },
  { key: 'title', isSortable: true },
  { key: 'director', isSortable: true },
  { key: 'year', isSortable: true },
  { key: 'durationMin', label: 'Duration (min)', isSortable: true },
  { key: 'genres', render: (m) => m.genres.join(', ') },
  { key: 'rating', isSortable: true },
];

export default function MoviesPage() {
  const navigate = useNavigate();
  return (
    <GenericPage<Movie>
      title="Movies"
      resource="movies"
      columns={columns}
      onRowClick={(m) => navigate(`/movies/${m.id}`)}
    />
  );
}
```

## 3) Details Page
```tsx
const fields: DetailField<Movie>[] = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'director', label: 'Director' },
  { key: 'year', label: 'Year' },
  { key: 'durationMin', label: 'Duration (min)' },
  { key: 'genres', label: 'Genres', render: (m) => m.genres.join(', ') },
  { key: 'rating', label: 'Rating' },
];

export default function MovieDetailsPage() {
  return (
    <GenericDetailsPage<Movie>
      resource="movies"
      title="Movie details"
      fields={fields}
      backTo="/movies"
    />
  );
}
```

## 4) Routes
```tsx
<Route path="/movies" element={<MoviesPage />} />
<Route path="/movies/:id" element={<MovieDetailsPage />} />
```

## 5) Navigation
```ts
const routes = [
  { path: '/movies', label: 'Movies' },
];
```

## 6) API Resource
Backend must provide `/movies` and `/movies/:id`.

## 7) Sorting & Search
Works automatically, add `sortAccessor` for complex fields.

## 8) Custom Rendering
Use `render` for formatting arrays, badges, etc.

## 9) Error & Loading States
Handled by `Spinner` and `ErrorAlert`.

## 10) Testing
- Open `/movies` — data loads.  
- Click a row → navigates to `/movies/:id`.  
- API errors → shown via `ErrorAlert`.
