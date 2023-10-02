import React from 'react'
import { Link } from 'react-router-dom';
import { VotationLayout } from '../../components'
import { themes } from '../../data';

export const SelectedPage = () => {
    // En esta página se selecciona los animes que se van a votar
    console.log(themes)
    return (
        <VotationLayout>
            <div className='flex flex-row flex-wrap items-center justify-center gap-4 md:gap-10 p-4  md:min-h-[90vh] min-h-[90vh] '>
                {
                    themes.map((theme) => (
                        <Link
                            to={`/seleccionar-tema/${ theme.name }`}
                            key={theme.id} className='flex flex-col py-6 gap-4 items-center border-2 border-white  hover:border-violet-500 focus:border-violet-500 transition-all w-[400px] md:w-[400px] rounded-2xl hover:scale-105 '>
                            <h1 className='text-2xl font-semibold'>{theme.name}</h1>
                            <img src={theme.image} alt={theme.name} className='md:w-56 md:h-56 w-32 h-32 object-cover rounded-xl' />
                        </Link>
                    ))
                }
            </div>
        </VotationLayout>
    )
}
