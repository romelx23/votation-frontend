import React from 'react'
import { useForm } from 'react-hook-form'
// import { useAnime } from '../../hooks';
import { ButtonAnime } from './ButtonAnime';
import { Anime } from '../../interfaces';

interface AddAnimePageProps {
    anime: Anime[],
    loading: boolean,
    getAnime: (query: string) => void,
    error: boolean
}

interface IForm {
    search: string
}

export const AddAnimePage: React.FC<AddAnimePageProps> = ({ anime, loading, getAnime, error }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        getValues,
        reset,
    } = useForm<IForm>({
        defaultValues: {
            search: ''
        }
    })

    const handleSearch = (data: IForm) => {
        getAnime(data.search);
        // reset();
    }

    return (
        <>
            <div className='w-full max-w-xl'>
                <form
                    autoComplete='off'
                    onSubmit={handleSubmit(handleSearch)}
                    className="flex w-full items-center  sticky top-[130px] z-10 bg-[#242424]">
                    <input type="text"
                        autoComplete='off'
                        {
                        ...register('search', { required: true })
                        }
                        // name='search'
                        // value={values.search}
                        // onChange={handleChange}
                        placeholder='Buscar Anime' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                    {/* {
                        loading && <p>Loading...</p>
                    } */}
                    <button className='btn h-10'
                        title='Buscar Anime'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                    </button>
                </form>

                <div className='flex flex-col gap-4'>
                    {loading ? <h1>Loading...</h1> : anime.map((anime) => {
                        return <div key={anime.mal_id}>
                            <div className='pb-2 flex items-center font-semibold relative max-w-[500px] justify-between'>
                                <h1 className="w-64 text-ellipsis overflow-hidden">{anime.title}</h1>
                                <p className='absolute top-0 left-0'>#{anime.mal_id}</p>
                                <div className='content-image'>
                                    <img src={anime.images.jpg.image_url} alt={anime.title} className="w-40 h-40 object-cover" />
                                </div>
                            </div>
                            <ButtonAnime anime={anime} />
                        </div>
                    })}
                    {
                        anime.length === 0 && <h1>No hay resultados</h1>
                    }
                    {
                        error && <h1>Hubo un error al buscar</h1>
                    }
                </div>
            </div>
        </>
    )
}
