import { Routes, Route } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import BooksPage from '@/pages/BooksPage';
import CarsPage from '@/pages/CarsPage';
import PaintingsPage from '@/pages/PaintingsPage';
import UsersPage from '@/pages/UsersPage';
import RecipesPage from '@/pages/RecipesPage';

import BookDetailsPage from '@/pages/details/BookDetailsPage';
import CarDetailsPage from '@/pages/details/CarDetailsPage';
import UserDetailsPage from '@/pages/details/UserDetailsPage';
import PaintingsDetailsPage from '@/pages/details/PaintingsDetailsPage';
import RecipesDetailsPage from '@/pages/details/RecipesDetailsPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:id" element={<BookDetailsPage />} />

      <Route path="/cars" element={<CarsPage />} />
      <Route path="/cars/:id" element={<CarDetailsPage />} />

      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserDetailsPage />} />

      <Route path="/paintings" element={<PaintingsPage />} />
      <Route path="/paintings/:id" element={<PaintingsDetailsPage />} />

      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/recipes/:id" element={<RecipesDetailsPage />} />

      <Route
        path="*"
        element={
          <div className="text-center py-16">
            <h2 className="text-lg font-medium text-gray-900">
              Page not found
            </h2>
          </div>
        }
      />
    </Routes>
  );
}
