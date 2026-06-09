import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from "react-router-dom"

const opciones = [
  { title: 'Home',      to: '/'          },
  { title: 'Formación', to: '/Formacion' },
  { title: 'Servicios', to: '/Servicios' },
  { title: 'Trabajos',  to: '/Trabajos'  },
  { title: 'Cursos',    to: '/Cursos'    },
  { title: 'Contacto',  to: '/Contacto'  },

]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { pathname } = useLocation()

  return (
    <Disclosure
      as="nav"
      className="relative bg-[#050d1a]/90 backdrop-blur-sm border-b border-[#00c8ff]/20 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#00c8ff]/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* Botón hamburguesa móvil */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-none p-2 text-[#5a8fa8] hover:bg-[#00c8ff]/10 hover:text-[#00c8ff] focus:outline-2 focus:-outline-offset-1 focus:outline-[#00c8ff]">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

            {/* Logo */}
            <div className="flex shrink-0 items-center gap-2">
              <img
                alt="Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
              <span className="hidden sm:block font-mono text-xs tracking-[3px] text-[#00c8ff] uppercase">
                Portfolio
              </span>
            </div>

            {/* Nav links */}
            <div className="hidden sm:ml-8 sm:block">
              <nav className="flex space-x-1">
                {opciones.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    aria-current={pathname === item.to ? 'page' : undefined}
                    className={classNames(
                      pathname === item.to
                        ? 'text-[#00c8ff] border-b border-[#00c8ff] bg-[#00c8ff]/5'
                        : 'text-[#5a8fa8] hover:text-[#00c8ff] hover:bg-[#00c8ff]/5 border-b border-transparent',
                      'rounded-none px-3 py-2 text-sm font-mono tracking-wider transition-colors',
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Notificaciones + Avatar */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-1">

            {/* Campana */}
            {/* <button
              type="button"
              className="relative rounded-none p-1.5 text-[#5a8fa8] hover:text-[#00c8ff] hover:bg-[#00c8ff]/10 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-[#00c8ff]"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-5" />
            </button> */}

            {/* Avatar dropdown */}
            <Menu as="div" className="relative ml-2">
              <MenuButton className="relative flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00c8ff]">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"
                  className="size-8 rounded-full bg-[#050d1a] outline outline-1 -outline-offset-1 outline-[#00c8ff]/40"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-none bg-[#050d1a] border border-[#00c8ff]/20 py-1 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                {/* <MenuItem>
                  <a href="#" className="block px-4 py-2 font-mono text-xs tracking-wider text-[#5a8fa8] hover:text-[#00c8ff] hover:bg-[#00c8ff]/5 data-focus:outline-hidden transition-colors">
                    Your profile
                  </a>
                </MenuItem> */}
                <MenuItem>
                  <a href="/admin" className="block px-4 py-2 font-mono text-xs tracking-wider text-[#5a8fa8] hover:text-[#00c8ff] hover:bg-[#00c8ff]/5 data-focus:outline-hidden transition-colors">
                    Ajustes
                  </a>
                </MenuItem>

                {/* <div className="my- h-px bg-[#00c8ff]/10" />  */}
                {/* <MenuItem>
                  <a href="#" className="block px-4 py-2 font-mono text-xs tracking-wider text-[#5a8fa8] hover:text-red-400 hover:bg-red-400/5 data-focus:outline-hidden transition-colors">
                    Sign out
                  </a>
                </MenuItem> */}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <DisclosurePanel className="sm:hidden border-t border-[#00c8ff]/10">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {opciones.map((item) => (
            <DisclosureButton
              key={item.title}
              as={Link}
              to={item.to}
              aria-current={pathname === item.to ? 'page' : undefined}
              className={classNames(
                pathname === item.to
                  ? 'text-[#00c8ff] bg-[#00c8ff]/5 border-l-2 border-[#00c8ff]'
                  : 'text-[#5a8fa8] hover:text-[#00c8ff] hover:bg-[#00c8ff]/5 border-l-2 border-transparent',
                'block rounded-none px-3 py-2 font-mono text-sm tracking-wider transition-colors',
              )}
            >
              {item.title}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}