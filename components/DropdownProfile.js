import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { VscSignOut } from "react-icons/vsc";

const dropdownNavigation = [
  { name: "Profil", href: "#", id: 1 },
  { name: "Pembelian", href: "#", id: 2  },
  { name: "wishlist", href: "#", id: 3  },
];

export default function DropdownProfile({ handleSignout, classNames, id }) {
  return (
    <>
      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="aa"
                />
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="absolute right-0 z-20 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {dropdownNavigation.map(item => (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                         key={item.id}
                          href={item.href}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-600"
                          )}
                        >
                            {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  </>
                ))}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "w-full flex px-4 mt-5 py-2 gap-3 text-sm font-bold text-gray-600"
                      )}
                      onClick={handleSignout}
                    >
                      Keluar
                      <span>
                        <VscSignOut className="w-5 h-5" />
                      </span>
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
}
