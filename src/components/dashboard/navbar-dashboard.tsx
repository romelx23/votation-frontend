import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../src/assets/logo-votation.jpg";
import { useAuthStore } from "../../store/auth/authStore";
import { googleLogout } from "@react-oauth/google";

export const NavbarDashboard = () => {
    const [show, setshow] = useState(false);
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    return (
        // <nav className="sticky top-0 bg-white border-gray-200 dark:bg-gray-900 z-50">
        <nav className="sticky top-0 bg-zinc-900 z-50 shadow-md transition-colors">
            <div
                className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
            >
                <Link
                    to="/dashboard"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src={logo}
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    <span
                        className="self-center text-xl lg:text-2xl font-semibold whitespace-nowrap dark:text-white"
                    >
                        Guess the opening
                    </span>
                </Link>
                <div
                    className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative"
                >
                    <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="user-dropdown"
                        data-dropdown-placement="bottom"
                        onClick={() => {
                            setshow(!show)
                            console.log(show);
                        }}
                    >
                        <span className="sr-only">Open user menu</span>
                        <div className="w-8 h-8 rounded-full flex justify-center items-center">
                            <span>
                                {
                                    user?.name[0].toUpperCase()
                                }
                            </span>
                        </div>
                    </button>
                    {/* <!-- Dropdown menu --> */}
                    <div
                        className={`z-50 absolute top-5 -right-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" ${ show ? "block" : "hidden"
                            }`}
                        id="user-dropdown"
                    >
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">
                                {
                                    user?.name.split(" ")[0]
                                }
                            </span>
                            <span className="block text-sm text-gray-500 truncate dark:text-gray-400"
                            >
                                {
                                    user?.email
                                }
                            </span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <Link
                                    to="/dashboard/settings"
                                    className="flex justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >Settings</Link
                                >
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        logout();
                                        googleLogout();
                                        navigate('/auth/login');
                                    }}
                                    className="flex justify-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >Sign out
                                </button>
                            </li>
                        </ul>
                    </div>

                </div>
                {/* <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-user"
                >
                    <ul
                        className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                    >
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                aria-current="page"
                            >Home</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >About</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >Services</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >Pricing</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >Contact</a
                            >
                        </li>
                    </ul>
                </div> */}
            </div>
        </nav>

    )
}
