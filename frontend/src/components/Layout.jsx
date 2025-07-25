import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">User Management System</h1>
            </div>
            <div className="flex items-center">
              <Link 
                to="/" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname === '/' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Users
              </Link>
              <Link 
                to="/create" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname.startsWith('/create') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Create User
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="py-6">
        {children}
      </main>
    </div>
  );
}

export default Layout;