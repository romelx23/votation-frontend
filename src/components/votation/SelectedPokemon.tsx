import React from 'react'
import { usePokemon } from '../../hooks';
import { VotationLayout } from '../layouts/VotationLayout';

export const SelectedPokemon = () => {
    const { pokemon, loading } = usePokemon();
    return (
        <VotationLayout>
            <div className="flex flex-col items-center">
                <h1>Añade Pokemons para la votación</h1>
                <form className="flex w-full items-center max-w-[500px]">
                    <input type="text" placeholder='Buscar Pokemon' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                    <button className='btn h-10'>
                        <i className="fas fa-search"></i>
                    </button>
                </form>
                {loading ? <h1>Loading...</h1> : pokemon.map((pokemon) =>
                    <div key={pokemon.name} >
                        <div className='flex items-center font-semibold relative'>
                            <h1 className="">{pokemon.name}</h1>
                            <p className='absolute bottom-0 right-0'>#{pokemon.id}</p>
                            <img src={pokemon.image} alt={pokemon.name} className="w-40 h-40" />
                        </div>
                        <button className='btn'>
                            Añadir a votación
                        </button>
                    </div>
                )}
            </div>
        </VotationLayout>
    )
}
