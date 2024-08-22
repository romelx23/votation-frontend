import { memo, useEffect, useState } from "react";
import {
    NavLink,
} from "react-router-dom";
import { useAuthStore } from "../../store/auth/authStore";
import { LogoBrand } from "../ui/LogoBrand";
import { ActiveLink } from "../ui/ActiveLink";
const NavbarHome = () => {
    const [show, setShow] = useState(false)
    const { user, revalidate } = useAuthStore();
    console.log({ user });

    useEffect(() => {
        if (!user) {
            revalidate();
        }
    }, []);
    return (
        <header>
            <nav className="bg-white border-gray-200 dark:bg-green-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <LogoBrand />
                    <button
                        onClick={() => setShow(!show)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`w-full fixed md:relative block md:w-auto md:left-auto md:-translate-y-0 transition-transform left-0  ${ show ? 'translate-y-20' : '-translate-y-full' }`}
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:mt-0 md:border-0 ">
                            <li>
                                <ActiveLink route="/"
                                    routes={['/', 'votar']} className={"text-xl font-semibold mr-4 text-white hover:text-indigo-600 "} aria-current="page"> Votaciones</ActiveLink>
                            </li>
                            <li>
                                <NavLink to="/seleccionar-tema" className={"text-xl font-semibold mr-4 text-white hover:text-indigo-600"} aria-current="page">Crea tu Votación</NavLink>
                            </li>
                            {
                                user ? (
                                    <li>
                                        <NavLink to="/dashboard" className="text-xl font-semibold mr-4 text-white hover:text-indigo-600 ">Dashboard</NavLink>
                                    </li>
                                )
                                    :
                                    <li>
                                        <NavLink to="/auth/login" className="text-xl font-semibold mr-4 text-white hover:text-indigo-600">Login</NavLink>
                                    </li>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default memo(NavbarHome);