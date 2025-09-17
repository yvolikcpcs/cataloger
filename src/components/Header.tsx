import { NavLink } from 'react-router-dom';

const routes = [
  { path: '/books', label: 'Books' },
  { path: '/cars', label: 'Cars' },
  { path: '/paintings', label: 'Paintings' },
  { path: '/users', label: 'Users' },
  { path: '/recipes', label: 'Recipes' },
];

const Header = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`;

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-10 border-b">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          <NavLink to="/">Cataloger Project</NavLink>
        </h1>

        <nav className="mt-4">
          <div className="inline-flex gap-2 rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-200">
            {routes.map(({ path, label }) => (
              <NavLink key={path} to={path} className={linkClass}>
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
