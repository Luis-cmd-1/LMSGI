
import { Link, useLocation } from "react-router-dom";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

// 1. Array de opciones actualizado para rutas de React Router
const opciones = [
  { title: 'Home', href: '/', current: false },
  { title: 'Trsssabajos', href: '/trabajos', current: false },
  { title: 'Contacto', href: '/contacto', current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function NavBar() {
  const location = useLocation(); // Hook para saber en qué página estamos

  return (
    <Disclosure as="nav" className="fixed top-0 w-full z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          
          {/* Botón menú móvil */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <img
                  alt="Logo"
                  src="https://cdn-icons-png.flaticon.com/512/6839/6839318.png"
                  className="h-10 w-auto cursor-pointer"
                />
              </Link>
            </div>

            {/* Menú Desktop con <Link> */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {opciones.map((item) => {
                  // Comprobamos si la ruta actual coincide con el link
                  const isCurrent = location.pathname === item.href;
                  
                  return (
                    <Link
                      key={item.title}
                      to={item.href}
                      className={classNames(
                        isCurrent ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium transition-colors'
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Lado derecho: Notificaciones y Perfil */}
          <div className="flex items-center pr-2 sm:static sm:ml-6 sm:pr-0">
            <button type="button" className="text-gray-400 hover:text-white">
              <BellIcon className="size-6" />
            </button>

            <Menu as="div" className="relative ml-3">
              <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none">
                <img
                  alt="Perfil"
                  src="https://img.freepik.com/vector-gratis/hacker-que-opera-ilustracion-icono-historieta-ordenador-portatil-concepto-icono-tecnologia-aislado-estilo-dibujos-animados-plana_138676-2387.jpg?w=740"
                  className="size-8 rounded-full"
                />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                <MenuItem>
                  <Link to="/perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Menú móvil con <Link> */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {opciones.map((item) => (
            <DisclosureButton
              key={item.title}
              as={Link} // IMPORTANTE: Usamos Link aquí también
              to={item.href}
              className={classNames(
                location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.title}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default NavBar;