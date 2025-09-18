import Header from '@/components/Header';
import { AppRoutes } from './AppRoutes';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-4 md:p-6">
          <AppRoutes />
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
