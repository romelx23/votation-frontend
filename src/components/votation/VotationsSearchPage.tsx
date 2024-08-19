import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import { SocketContext } from '../../context';
import { useAppDispatch, useAppSelector, useVotation } from '../../hooks';
import { IVotations } from '../../interfaces';
import { useWindowSize } from '../../hooks/useWindowSize';
import Confetti from 'react-confetti';
import { setConfettiActive } from '../../store/slices';

export const VotationsSearchPage = () => {
    // const { getVotations } = useContext(SocketContext);

    const { getVotations } = useVotation();
    const [load, setLoad] = useState(false);
    const [search, setSearch] = useState('');
    // const [votationFilter, setVotationFIlter] = useState<IVotations[]>([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalVotations, setTotalVotations] = useState(0);

    const dispatch = useAppDispatch();

    const fetchVotations = async (page = 0, searchQuery = '') => {
        setLoad(true);
        const offset = page * 10;
        const total = await getVotations(10, offset, searchQuery);
        setTotalVotations(total || 0);
        setLoad(false);
    };

    useEffect(() => {
        fetchVotations(currentPage, search);
    }, [currentPage]);

    const { width, height } = useWindowSize();

    const { votations } = useAppSelector(state => state.votation);
    const { isConfettiActive } = useAppSelector(state => state.anime);

    const navigate = useNavigate();

    const handleVotation = (id: string) => {
        navigate(`/votar/${ id }`);
    }

    const handleReload = () => {
        setSearch('');
        setCurrentPage(0);
        fetchVotations(0);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(totalVotations / 10);

    // const handleSearch = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setVotationFIlter(votations.filter(votation => votation.title.toLowerCase().includes(search.toLowerCase())));
    // }

    const validateImage = (image: string) => {

        const regex = /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i;

        if (image === '') {
            return 'https://res.cloudinary.com/react-romel/image/upload/v1721428197/vavdepp5t9iptdkrdeu2_hsda3x.webp';
        }

        // if (!regex.test(image)) {
        //     return 'https://res.cloudinary.com/react-romel/image/upload/v1721428197/vavdepp5t9iptdkrdeu2_hsda3x.webp';
        // }

        return image;
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchVotations(0, search);
    };

    console.log(isConfettiActive);

    return (
        <>
            <div className="flex items-center flex-col gap-4 py-4 px-2">

                <div className="flex flex-col items-center w-full max-w-4xl">
                    <form className="w-full flex py-3 justify-center"
                        onSubmit={handleSearch}
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Buscar votación"
                            className="border rounded-md px-2 py-1 w-full max-w-md"
                        />
                        <button className="bg-blue-500 text-white px-4 py-3 rounded-md ml-2"
                            title='Buscar votación'
                            type='submit'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-3 rounded-md ml-2"
                            title='Recargar votaciones'
                            type='button'
                            onClick={handleReload}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3.06 13a9 9 0 1 0 .49 -4.087" /><path d="M3 4.001v5h5" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                        </button>
                    </form>
                    <div className="flex gap-2 items-center">
                        {
                            load &&
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 animate-spin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a9 9 0 1 0 9 9" /></svg>
                                <span>
                                    Cargando votaciones...
                                </span>
                            </>
                        }
                    </div>
                    <div className="flex place-content-center flex-wrap gap-2">

                        {
                            votations.map((votation, i) => (
                                <Link
                                    to={`/votar/${ votation.uid }`}
                                    // onClick={() => handleVotation(votation.uid)}
                                    key={votation.uid}
                                    className='flex flex-col relative md:h-36 h-32 cursor-pointer w-full sm:w-96 group hover:scale-110 transition-transform'>
                                    <div className="absolute flex flex-col justify-center items-center w-full h-full font-semibold text-white z-50">
                                        {/* <p className='pr-4'></p> */}
                                        <p>{i + 1})  {votation.title}</p>
                                        <p className='text-sm text-gray-400'>{votation.creator}</p>
                                    </div>
                                    <img src={validateImage(votation.image)}
                                        onError={(e) => e.currentTarget.src = 'https://res.cloudinary.com/react-romel/image/upload/v1721428197/vavdepp5t9iptdkrdeu2_hsda3x.webp'}
                                        alt="10-mejores-openings-animes" title='10 mejores openings' className=' w-full h-full opacity-25 object-cover transition duration-300 ease-in-out group-hover:opacity-75' />
                                </Link>
                            ))
                        }
                    </div>
                </div>

                {
                    votations.length === 0 &&
                    <div className="flex justify-center">
                        <p>No hay votaciones</p>
                    </div>
                }

                <div className="flex justify-center">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i)}
                            className={`px-4 py-2 mx-1 ${ currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-500' }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <div className="h-16"></div>
            </div>
            {isConfettiActive && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={300}
                    onConfettiComplete={() => dispatch(setConfettiActive(false))}
                />
            )}
        </>
    )
}
