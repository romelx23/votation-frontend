import { ChangeEvent, useEffect, useState } from "react";
import { DashboardLayout } from "../../components/layouts/dashboard-layout"
import { toast } from "sonner";
import { votationApi } from "../../api/config";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/auth/authStore";
import { format } from "date-fns";
import { ModalWrapper } from "../../components/ui/ModalWrapper";
import { IVotations, IVotationState, ResGetVotations } from "../../interfaces";
import { Pagination } from "../../components/ui/Pagination";
import { useAnime, useAppDispatch, useAppSelector, useUi, useVotation } from "../../hooks";
import { setAnimeListCollection, setConfiguration } from "../../store/slices";
import { ModalVotation } from "../../components/dashboard/modals/modal-votation";

export const DashboardVotation = () => {

    const baseUrl = import.meta.env.VITE_HOST_URL;

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenPrint, setIsOpenPrint] = useState(false);
    const [votations, setVotations] = useState<IVotations[]>([]);
    const [incident, setIncident] = useState<IVotations | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);


    const [id, setId] = useState<string>('');
    const [votationData, setVotationData] = useState<IVotationState | null>(null);
    const [loader, setLoader] = useState(false);
    const { user } = useAuthStore();

    // Calcular el índice del último y el primer ítem en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Obtener los elementos de la página actual
    const currentItems = votations.slice(indexOfFirstItem, indexOfLastItem);

    // Función para cambiar de página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // const driverObj = driver({
    //     showProgress: true,
    //     steps: [
    //         { element: '#incident-table', popover: { title: 'Animated Tour Example', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' } },
    //         { element: '#add-button', popover: { title: 'Import the Library', description: 'It works the same in vanilla JavaScript as well as frameworks.', side: "bottom", align: 'start' } },
    //     ]
    // });

    const {
        register,
        handleSubmit,
    } = useForm<{
        search: string,
        date: string
    }>({
        defaultValues: {
            search: '',
            date: ''
        }
    });

    const {
        register: registerVisible,
        handleSubmit: handleSubmitVisible,
    } = useForm<{
        visibility: boolean
    }>({
        defaultValues: {
            visibility: false
        }
    });

    const handleToggle = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        const visibility = event.target.checked;
        onSubmitVisible({ visibility, id });
    };

    const onSubmitVisible = (data: { visibility: boolean, id: string }) => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, salir!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const resp = await votationApi.put(`/votation/${ data.id }/visibility`, {
                        visibility: data.visibility
                    }, {
                        headers: {
                            'x-token': localStorage.getItem('x-token') || ''
                        }
                    });
                    console.log({ resp });
                    getVotationData();
                } catch (error) {
                    console.error('Error updating visibility:', error);
                }
            }
        });
    }

    const getVotationData = async (name?: string, date?: string) => {
        try {
            setLoader(true);
            const { data: votationsData } = await votationApi.get<ResGetVotations>(`/votation/by-user?limit=50&search=${ name }&date=${ date }`, {
                headers: {
                    'x-token': localStorage.getItem('x-token') || ''
                }
            }); // Fetch categories
            console.log({ votationsData });
            setVotations(votationsData.votations);
            setLoader(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoader(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await votationApi.delete(`/votation/${ id }`, {
                        headers: {
                            "x-token": localStorage.getItem("x-token") || "",
                        }
                    });
                    console.log({ response });
                    getVotationData();
                    toast.success('Incidente eliminado correctamente');
                }
            });
        } catch (error) {
            console.error('Error deleting area:', error);
        }
    };

    useEffect(() => {
        getVotationData();
    }, []);

    const dispatch = useAppDispatch();

    // const { votation: data } = useAppSelector(state => state.votation);

    // const { items } = data;

    const { getVotation } = useVotation();

    const handleModalOpenEdit = async (votation: IVotations) => {
        setIsOpen(true);
        setId(votation.uid);

        const resp = await getVotation(votation.uid);
        if (!resp) return;
        const { items } = resp;

        console.log(items);

        const animesVotation = items.map(item => ({
            mal_id: item.mal_id,
            title: item.name,
            image: item.image
        }));

        // setear los animes
        dispatch(setAnimeListCollection(animesVotation));

        const formData = {
            name: votation.title,
            description: votation.description,
            image: votation.image,
            cantidad: items.length,
            autor: votation.creator,
            color: votation.color,
            expiration: format(new Date(votation?.expiration), 'yyyy-MM-dd'),
            visibility: votation.visibility
        }
        console.log(formData);

        setVotationData(formData);

        // setear la configuración del formulario
        dispatch(setConfiguration(formData));
    }

    const handleModalOpenCopy = async (votation: IVotations) => {
        setIsOpen(true);
        // setId(votation.uid);

        const resp = await getVotation(votation.uid);
        if (!resp) return;
        const { items } = resp;

        console.log(items);

        const animesVotation = items.map(item => ({
            mal_id: item.mal_id,
            title: item.name,
            image: item.image
        }));

        // setear los animes
        dispatch(setAnimeListCollection(animesVotation));

        const formData = {
            name: votation.title,
            description: votation.description,
            image: votation.image,
            cantidad: items.length,
            autor: votation.creator,
            color: votation.color,
            expiration: format(new Date(votation?.expiration), 'yyyy-MM-dd'),
            visibility: votation.visibility
        }
        console.log(formData);

        setVotationData(formData);

        // setear la configuración del formulario
        dispatch(setConfiguration(formData));
    }

    const handleExportCSV = async (votation: IVotations) => {
        const resp = await getVotation(votation.uid);
        if (!resp) return;
        const { items } = resp;

        const animesVotation = items.map(item => ({
            mal_id: item.mal_id,
            title: item.name,
            image: item.image
        }));


        const formData = {
            name: votation.title,
            description: votation.description,
            image: votation.image,
            cantidad: items.length,
            autor: votation.creator,
            color: votation.color,
            expiration: format(new Date(votation?.expiration), 'yyyy-MM-dd'),
            visibility: votation.visibility
        }
        console.log(formData);

        const headers = 'Index,ID,Name,Image';  // Agrega títulos de cabecera
        const csv = items.map((item, index) => {
            return `${ index + 1 },${ item.mal_id },${ item.name },${ item.image }`;
        }).join('\n');

        //    agregar los datos del formData

        const headersFormData = "name,description,image,cantidad,autor,color,expiration,visibility"

        const csvFormData = Object.values(formData);

        const csvWithHeaders = `${ headers }\n${ csv }\n${ headersFormData }\n${ csvFormData }`;

        const blob = new Blob([csvWithHeaders], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `calification-op-${ format(new Date(), 'yyyy-MM-dd') }.csv`;
        a.click();
    }


    return (
        <DashboardLayout>
            <div className="flex flex-col min-h-[80vh] p-3 pl-5">
                <div className="flex flex-wrap items-center justify-between w-full mb-2 relative z-20 gap-2">
                    <h3 className="text-lg font-semibold ">
                        Gestión incidentes
                    </h3>
                    {
                        loader && (
                            <div className="absolute top-12  flex items-center justify-center translate-x-1/2 left-1/2">
                                <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                            </div>
                        )
                    }

                    <div className="flex gap-2">
                        <button
                            id="add-button"
                            onClick={() => {
                                getVotationData();
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-restore"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3.06 13a9 9 0 1 0 .49 -4.087" /><path d="M3 4.001v5h5" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                        </button>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            Nueva Votación
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap items-center mb-2">
                    <form
                        onSubmit={handleSubmit((data) => {
                            console.log(data);
                            getVotationData(data.search, data.date);
                        })}
                        className="flex items-start"
                        id="incident-table"
                    >
                        <div className="flex flex-col px-2">
                            <input type="text" placeholder="Buscar incidencia" className="px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 focus:border-2 border-transparent border-2 w-full"
                                {
                                ...register('search')
                                }
                            />
                            <span
                                className="px-2 text-gray-500 dark:text-gray-400 text-sm"
                            >
                                * Buscar por título o nombre de usuario
                            </span>
                        </div>
                        <div className="flex flex-col px-2">
                            <input type="date" placeholder="Buscar incidencia por fecha" className="px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 focus:border-2 border-transparent border-2 w-full"
                                {
                                ...register('date')
                                }
                            />
                        </div>
                        <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                        </button>
                    </form>


                </div>


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Indice
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Título
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Usurio
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Imagen
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Descripción
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    tipo de Formulario
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estado
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fecha de creación
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fecha de expiración
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItems &&
                                currentItems.length === 0 && (
                                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td colSpan={11} className="text-center py-4">
                                            No hay votaciones
                                        </td>
                                    </tr>
                                )
                            }
                            {
                                currentItems &&
                                currentItems.map((votation, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {
                                                itemsPerPage * (currentPage - 1) + index + 1
                                            }
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <span className="flex max-w-[140px] overflow-ellipsis">

                                            </span>
                                            {votation.title}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <span className="flex max-w-[140px] overflow-ellipsis">

                                            </span>
                                            {votation?.creator}
                                        </th>
                                        <td className="px-6 py-4">
                                            {
                                                votation.image ?
                                                    <img
                                                        src={votation.image}
                                                        alt={votation.title}
                                                        className="w-10 h-10 object-cover rounded-full"
                                                    />
                                                    :
                                                    <div
                                                        className="w-10 h-10 rounded-full"
                                                        style={{
                                                            backgroundColor: votation.color
                                                        }}
                                                    >
                                                        <span>
                                                            No hay imagen
                                                        </span>
                                                    </div>
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {votation.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* {votation.type_form} */}
                                            anime
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-2">
                                                <span>
                                                    {
                                                        votation.color
                                                    }
                                                </span>
                                                <div
                                                    className="w-10 h-10 rounded-full"
                                                    style={{
                                                        backgroundColor: votation.color
                                                    }}
                                                ></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* <form
                                                onSubmit={handleSubmitVisible(onSubmitVisible)}
                                            > */}
                                            <div className="flex flex-col gap-1">
                                                <span>
                                                    {
                                                        votation?.visibility ? 'public' : 'private'
                                                    }
                                                </span>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input type="checkbox"
                                                        {...registerVisible('visibility')}
                                                        checked={votation?.visibility}
                                                        className="sr-only peer"
                                                        onChange={(ev) => handleToggle(ev, votation.uid)}
                                                    />
                                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                            {/* </form> */}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                format(new Date(votation.createdAt), 'yyyy-MM-dd')
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                format(new Date(votation.expiration), 'yyyy-MM-dd')
                                            }
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <div className="flex flex-wrap gap-1">
                                                <button
                                                    title="Copiar link"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(`${ baseUrl }/votar/${ votation.uid }`);
                                                        toast.success('Link copiado correctamente');
                                                    }}
                                                    className="font-medium text-purple-600 dark:text-purple-500 hover:underline">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
                                                </button>
                                                <button
                                                    title="Editar"
                                                    onClick={() => {
                                                        handleModalOpenEdit(votation)
                                                    }}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                                </button>
                                                <button
                                                    title="Exportar CSV"
                                                    onClick={() => {
                                                        handleExportCSV(votation)
                                                    }}
                                                    className="font-medium text-green-600 dark:text-green-500 hover:underline">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-arrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 15h6" /><path d="M12.5 17.5l2.5 -2.5l-2.5 -2.5" /></svg>

                                                </button>
                                                <button
                                                    onClick={() => {
                                                        navigator.share({
                                                            title: 'Votación',
                                                            text: 'Vota en esta encuesta',
                                                            url: `${ baseUrl }/votar/${ votation.uid }`,
                                                        });
                                                    }}
                                                    title="Share"
                                                    className="font-medium text-orange-600 dark:text-orange-500 hover:underline">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-share"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M8.7 10.7l6.6 -3.4" /><path d="M8.7 13.3l6.6 3.4" /></svg>

                                                </button>
                                                <button
                                                    title="Copiar Formulario"
                                                    onClick={() => {
                                                        handleModalOpenCopy(votation)
                                                    }}
                                                    className="font-medium text-sky-600 dark:text-sky-500 hover:underline">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-folders"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" /></svg>

                                                </button>
                                                {
                                                    user?.role !== "USER_ROLE" &&
                                                    <button
                                                        title="Eliminar"
                                                        onClick={() => handleDelete(votation.uid)}
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg>

                                                    </button>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={votations.length}
                        paginate={paginate}
                    />
                </div>

                {
                    <ModalWrapper
                        leftTitle={id ? 'Editar incidente' : 'Nuevo incidente'}
                        isOpen={isOpen}
                        // onClose={() => {
                        //     Swal.fire({
                        //         title: '¿Estás seguro?',
                        //         text: "No podrás revertir esto!",
                        //         icon: 'warning',
                        //         showCancelButton: true,
                        //         confirmButtonColor: '#3085d6',
                        //         cancelButtonColor: '#d33',
                        //         confirmButtonText: 'Sí, salir!'
                        //     }).then((result) => {
                        //         if (result.isConfirmed) {
                        //             setIsOpen(false);
                        //             setId('');
                        //         }
                        //     });
                        // }}
                        onClose={() => {
                            setIsOpen(false);
                            setId('');
                        }}
                    >
                        <ModalVotation
                            id={id}
                        />
                    </ModalWrapper>
                }
            </div>
        </DashboardLayout>
    )
}
