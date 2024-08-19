import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ActiveLink } from './ActiveLink'

export const Navbar = () => {

    // const { user, revalidate } = useAuthStore();
    // console.log({ user });

    return (
        <div className='w-full flex justify-between bg-green-600 px-3 py-4'>
            <Link to="/">
                <h1 className='text-2xl font-semibold'>AnimeV.</h1>
            </Link>
            <div className="w-full sm:flex justify-end hidden">
                {/* <NavLink to="/" className='text-2xl font-semibold mr-4 text-white hover:text-indigo-600'>
                    Votaciones
                </NavLink> */}
                <ActiveLink
                    route="/"
                    routes={['/', 'votar']}
                    className='text-2xl font-semibold mr-4 text-white hover:text-indigo-600'
                >
                    Votaciones
                </ActiveLink>
                <NavLink to="/seleccionar-tema" className='text-2xl font-semibold text-white'>Crea tu Votación</NavLink>
                {/* {
                                user ? (
                                    <li>
                                        <NavLink to="/dashboard" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent border-b border-transparent hover:border-violet-800 ">Dashboard</NavLink>
                                    </li>
                                )
                                    :
                                    <li>
                                        <NavLink to="/auth/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent border-b border-transparent hover:border-violet-800 ">Login</NavLink>
                                    </li>
                            } */}

            </div>
        </div>
    )
}
