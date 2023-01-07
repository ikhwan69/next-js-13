import { Disclosure, Transition, } from "@headlessui/react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import DropdownProfile from "./DropdownProfile";
import { useEffect, useState } from "react";
import Image from 'next/image'

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "About", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [token, setToken] = useState(null)

  // pengambilan token melalui useEffect untuk menghindari React Hydration Error
  useEffect(() => {
    setToken(() => sessionStorage.getItem("token") || null)
  }, [])

  const handleNavbar = () => {
    if (token) {
      return <DropdownProfile handleSignout={handleSignout} classNames={classNames} />
    } else {
      return <Link className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300" href={"/login"}>
        Login
      </Link>
    }
  }

  const handleSignout = () => {
    sessionStorage.removeItem("token");
    return window.location.href = "/login"

  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile Menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <IoClose className="block w-6 h-6" />
                  ) : (
                    <FiMenu className="block w-6 h-6" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex items-center justify-center flex-1 gap-5 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <Image
                    className="hidden w-auto h-8 lg:block"
                    src="https://i.ibb.co/Tb1kqw6/logo-white.png"
                    width={100}
                    height={100}
                    alt="logo"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-blue-500 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {handleNavbar()}
              </div>
            </div>
          </div>
          <Transition
            show={open}
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

