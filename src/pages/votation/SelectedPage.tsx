import React from 'react'
import { Link } from 'react-router-dom';
import { VotationLayout } from '../../components'
import { themes } from '../../data';

export const SelectedPage = () => {
    // En esta página se selecciona los animes que se van a votar
    console.log(themes)
    return (
        <VotationLayout>
            <div className='flex flex-col items-center justify-center gap-2 p-4'>
                {
                    themes.map((theme) => (
                        <Link
                            to={`/seleccionar-tema/${theme.name}`}
                            key={theme.id} className='flex flex-col gap-4 items-center rounded border border-white hover:border-violet-500 focus:border-violet-500 py-2 w-full md:w-[600px]'>
                            <img src={theme.image} alt={theme.name} className='md:w-52 md:h-52 w-32 h-32 object-cover' />
                            <h1 className='text-2xl font-semibold'>{theme.name}</h1>
                        </Link>
                    ))
                }
            </div>
        </VotationLayout>
    )
}
