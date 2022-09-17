import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div className='w-full flex justify-between bg-green-600 px-2 py-2'>
            <h1 className='text-lg font-semibold'>AnimeV.</h1>
            <div className="w-full sm:flex justify-end hidden">
                <NavLink to="/" className='text-lg font-semibold mr-4 text-white'>Votación</NavLink>
                <NavLink to="/seleccionar-tema" className='text-lg font-semibold text-white'>Selección</NavLink>
            </div>
        </div>
    )
}
