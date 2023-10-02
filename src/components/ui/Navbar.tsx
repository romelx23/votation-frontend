import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div className='w-full flex justify-between bg-green-600 px-3 py-4'>
            <Link to="/">
                <h1 className='text-2xl font-semibold'>AnimeV.</h1>
            </Link>
            <div className="w-full sm:flex justify-end hidden">
                <NavLink to="/" className='text-2xl font-semibold mr-4 text-white'>
                    Votaciones
                </NavLink>
                <NavLink to="/seleccionar-tema" className='text-2xl font-semibold text-white'>Crea tu Votación</NavLink>
            </div>
        </div>
    )
}
