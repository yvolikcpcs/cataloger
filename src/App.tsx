import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import CarsPage from './pages/CarsPage';
import PaintingsPage from './pages/PaintingsPage';
import UsersPage from './pages/UsersPage';

export default function App() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 rounded ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white/80 backdrop-blur sticky top-0 z-10 border-b">
        <div className="mx-auto max-w-6xl px-4 py-4">
            <h1 className="text-xl font-semibold text-gray-900">Cataloger Project</h1>

          <nav className="mt-4">
            <div className="inline-flex gap-2 rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-200">
              <NavLink to="/books" className={linkClass}>
                Books
              </NavLink>
              <NavLink to="/cars" className={linkClass}>
                Cars
              </NavLink>
              <NavLink to="/paintings" className={linkClass}>
                Paintings
              </NavLink>
              <NavLink to="/users" className={linkClass}>
                Users
              </NavLink>
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/books" replace />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/paintings" element={<PaintingsPage />} />
            <Route path="/users" element={<UsersPage />} />

            <Route
              path="*"
              element={
                <div className="text-center py-16">
                  <h2 className="text-lg font-medium text-gray-900">Page not found</h2>
                </div>
              }
            />
          </Routes>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Cataloger. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
