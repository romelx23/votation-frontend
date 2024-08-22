import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useVotation } from '../../../../hooks';
import { IVotations, IVotationState, ResGetVotations } from '../../../../interfaces';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../../store/auth/authStore';
import { cleanConfiguration, clearAnimeList, setAnimeListCollection, setConfiguration } from '../../../../store/slices';
import { votationApi } from '../../../../api/config';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { ModalWrapper } from '../../../ui/ModalWrapper';
import { LaoderGeneral } from '../../../ui/LaoderGeneral';
import { formatInTimeZone } from 'date-fns-tz';
import { ModalVotation } from '../../modals/modal-votation';
import { Pagination } from '../../../ui/Pagination';
import { ItemsVotation } from './item-votation';
import { IVotationSharedResponse, VotationElement } from '../../../../interfaces/votation/shared';
import { usePagination } from '../../../../hooks/usePagination';
import { TableGeneral } from '../table-general';

interface UsersVotationResponse {
    ok: boolean;
    users: UsersVotation[];
}

interface UsersVotation {
    id: string;
    email: string;
    name: string;
}

export const TableVotation = () => {

    const baseUrl = import.meta.env.VITE_HOST_URL;

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenPrint, setIsOpenPrint] = useState(false);
    const [votations, setVotations] = useState<IVotations[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [selectedvotation, setSelectedVotation] = useState<IVotations | null>(null);
    const [userByVotation, setUserByVotation] = useState<UsersVotation[]>([]);
    const [votationsShared, setvotationsShared] = useState<VotationElement[]>([]);

    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage] = useState(5);

    // Calcular el índice del último y el primer ítem en la página actual
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Función para cambiar de página
    // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    // Obtener los elementos de la página actual
    // const currentItems = votations.slice(indexOfFirstItem, indexOfLastItem);

    const {
        currentData: currentItems,
        currentPage,
        itemsPerPage,
        jump
    } = usePagination(votations, 5);

    const {
        currentData: currentItemsShared,
        currentPage: currentPageShared,
        itemsPerPage: itemsPerPageShared,
        jump: jumpShared
    } = usePagination(votationsShared, 5);

    const [id, setId] = useState<string>('');
    const [votationData, setVotationData] = useState<IVotationState | null>(null);
    const [loader, setLoader] = useState(false);
    const { user } = useAuthStore();

    // const currentItemsShared = votationsShared.slice(indexOfFirstItem, indexOfLastItem);

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
        register: registerUser,
        handleSubmit: handleSubmitUser,
        reset: resetUser
    } = useForm<{
        email: string,
    }>({
        defaultValues: {
            email: '',
        }
    });

    const handleOpenNewVotation = () => {
        setIsOpen(true);
        dispatch(cleanConfiguration());
        dispatch(clearAnimeList());
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

    useEffect(() => {
        getVotationData();
    }, []);


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

    const dispatch = useAppDispatch();

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
            expiration: formatInTimeZone(new Date(votation?.expiration), 'UTC', 'yyyy-MM-dd'),
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
            expiration: formatInTimeZone(new Date(votation?.expiration), 'UTC', 'yyyy-MM-dd'),
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
            expiration: formatInTimeZone(new Date(votation?.expiration), 'UTC', 'yyyy-MM-dd'),
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
        a.download = `calification-op-${ formatInTimeZone(new Date(), 'UTC', 'yyyy-MM-dd') }.csv`;
        a.click();
    }


    const handleAddUser = async (data: { email: string }) => {
        try {
            const { data: dataUser } = await votationApi.post('/shared', {
                email: data.email,
                votationId: selectedvotation?.uid
            }, {
                headers: {
                    'x-token': localStorage.getItem('x-token') || ''
                }
            });
            console.log(dataUser);
            // getVotationData();
            getUsersByVotation(selectedvotation?.uid || '');

            toast.success('Usuario agregado correctamente');

            resetUser()

        } catch (error) {
            console.log(error);
            toast.error('Error al agregar usuario');
        }
    }

    const getUsersByVotation = async (id: string) => {
        try {
            const { data: dataUsers } = await votationApi.get<UsersVotationResponse>(`/shared/${ id }`, {
                headers: {
                    'x-token': localStorage.getItem('x-token') || ''
                }
            });
            console.log(dataUsers);
            setUserByVotation(dataUsers.users);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteUser = async (id: string) => {
        try {
            const { data: dataUsers } = await votationApi.delete(`/shared/${ id }`, {
                headers: {
                    'x-token': localStorage.getItem('x-token') || ''
                }
            });
            console.log(dataUsers);
            getUsersByVotation(selectedvotation?.uid || '');
            toast.success('Usuario eliminado correctamente');
        } catch (error) {
            console.log(error);
            toast.error('Error al eliminar usuario');
        }
    }

    const getVotationByUsersShared = async () => {
        try {
            const { data: dataVotations } = await votationApi.get<IVotationSharedResponse>(`/shared/shared-votation`, {
                headers: {
                    'x-token': localStorage.getItem('x-token') || ''
                }
            });
            console.log(dataVotations);
            setvotationsShared(dataVotations.votations);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getVotationByUsersShared();
    }, []);

    useEffect(() => {
        console.log("selectedvotation");
        if (selectedvotation) {
            getUsersByVotation(selectedvotation?.uid || '');
        }
    }, [selectedvotation]);

    return (
        <>

            <div className="flex flex-wrap items-center justify-between w-full mb-2 relative z-20 gap-2">
                <h3 className="text-lg font-semibold ">
                    Gestión de Votaciones
                </h3>
                {
                    loader && (

                        <div className="absolute top-12 flex gap-2 items-center justify-center translate-x-1/2 left-1/2">
                            <LaoderGeneral />
                            <span className="">
                                Cargando...
                            </span>
                        </div>
                    )
                }

                <div className="flex gap-2">
                    <button
                        id="get-votation"
                        name='cargar votaciones'
                        title='cargar votaciones'
                        onClick={() => {
                            getVotationData();
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-restore"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3.06 13a9 9 0 1 0 .49 -4.087" /><path d="M3 4.001v5h5" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                    </button>
                    <button
                        id="get-votation-shared"
                        name='cargar votaciones compartidas'
                        title='cargar votaciones compartidas'
                        onClick={() => {
                            getVotationByUsersShared()
                        }}
                        className="px-4 py-2 bg-sky-500 text-white rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-restore"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3.06 13a9 9 0 1 0 .49 -4.087" /><path d="M3 4.001v5h5" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                    </button>
                    <button
                        id="add-votation"
                        name='agregar nueva votación'
                        title='agregar nueva votación'
                        onClick={handleOpenNewVotation}
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
                        <input type="text" placeholder="Buscar votación" className="px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 focus:border-2 border-transparent border-2 w-full"
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
                    <button
                        title='Buscar'
                        type="submit" className="px-3 py-2 bg-blue-500 text-white rounded-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                    </button>
                </form>


            </div>

            {/*TODO listar las votaciones compartidas con este usuario */}

            {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
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
                        <ItemsVotation
                            currentItems={currentItems}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            handleToggle={handleToggle}
                            handleModalOpenEdit={handleModalOpenEdit}
                            handleModalOpenCopy={handleModalOpenCopy}
                            handleDelete={handleDelete}
                            handleExportCSV={handleExportCSV}
                            setSelectedVotation={setSelectedVotation}
                            setShow={setShow}
                            show={show}
                            user={user}
                            baseUrl={baseUrl}
                        />
                    </tbody>
                </table>
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={votations.length}
                    paginate={jump}
                />
            </div> */}

            <TableGeneral
                title='Votaciones Creadas'
                headers={[
                    'Indice',
                    'Título',
                    'Usurio',
                    'Imagen',
                    'Descripción',
                    'tipo de Formulario',
                    'Color',
                    'Estado',
                    'Fecha de creación',
                    'Fecha de expiración',
                    'Acciones'
                ]}
                paginate={jump}
                items={votations}
                totalItems={votations.length}
                ContentTable={
                    <ItemsVotation
                        currentItems={currentItems}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        handleToggle={handleToggle}
                        handleModalOpenEdit={handleModalOpenEdit}
                        handleModalOpenCopy={handleModalOpenCopy}
                        handleDelete={handleDelete}
                        handleExportCSV={handleExportCSV}
                        setSelectedVotation={setSelectedVotation}
                        setShow={setShow}
                        show={show}
                        user={user}
                        baseUrl={baseUrl}
                    />
                }
            />

            <TableGeneral
                title='Votaciones Compartidas'
                headers={[
                    'Indice',
                    'Título',
                    'Usurio',
                    'Imagen',
                    'Descripción',
                    'tipo de Formulario',
                    'Color',
                    'Estado',
                    'Fecha de creación',
                    'Fecha de expiración',
                    'Acciones'
                ]}
                paginate={jumpShared}
                items={votationsShared}
                totalItems={votationsShared.length}
                renderRow={(item, index) => (
                    <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-3">
                            {index + 1}
                        </td>
                        <td className="px-6 py-3">
                            {item.votation.title}
                        </td>
                        <td className="px-6 py-3">
                            {item.owner}
                        </td>
                        <td className="px-6 py-3">
                            <img src={
                                item.votation.image
                            } alt={item.votation.title} className="w-10 h-10 object-cover rounded-full" />
                        </td>
                        <td className="px-6 py-3">
                            {item.votation.description}
                        </td>
                        <td className="px-6 py-3">
                            {item.votation.type_form}
                        </td>
                        <td className="px-6 py-3">
                            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: item.votation.color }}></div>
                        </td>
                        <td className="px-6 py-3">
                            {item.votation.visibility ? 'Activo' : 'Inactivo'}
                        </td>
                        <td className="px-6 py-3">
                            {formatInTimeZone(new Date(item.votation.createdAt), 'UTC', 'yyyy-MM-dd')}
                        </td>
                        <td className="px-6 py-3">
                            {formatInTimeZone(new Date(item.votation.expiration), 'UTC', 'yyyy-MM-dd')}
                        </td>
                        <td className="px-6 py-3">
                            <div className="flex gap-2 items-center">
                                <button
                                    onClick={() => handleModalOpenEdit({
                                        uid: item.votation._id,
                                        title: item.votation.title,
                                        description: item.votation.description,
                                        image: item.votation.image,
                                        color: item.votation.color,
                                        creator: item.votation.creator,
                                        expiration: item.votation.expiration.toString(),
                                        type_form: item.votation.type_form,
                                        visibility: item.votation.visibility,
                                        user: item.votation.user,
                                        createdAt: item.votation.createdAt.toString()
                                    })}
                                    className="px-3 py-2 bg-blue-500 text-white rounded-md flex gap-2"
                                >
                                    Editar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                </button>

                                <button
                                    onClick={() => handleModalOpenCopy({
                                        uid: item.votation._id,
                                        title: item.votation.title,
                                        description: item.votation.description,
                                        image: item.votation.image,
                                        color: item.votation.color,
                                        creator: item.votation.creator,
                                        expiration: item.votation.expiration.toString(),
                                        type_form: item.votation.type_form,
                                        visibility: item.votation.visibility,
                                        user: item.votation.user,
                                        createdAt: item.votation.createdAt.toString()
                                    })}
                                    className="px-3 py-2 bg-blue-500 text-white rounded-md flex gap-2"
                                >
                                    Copiar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-folders"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" /></svg>
                                </button>
                                {/* <button
                                    onClick={() => handleDelete(item.uid)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-md"
                                >
                                    Eliminar
                                </button> */}
                                <button
                                    onClick={() => handleExportCSV({
                                        uid: item.votation._id,
                                        title: item.votation.title,
                                        description: item.votation.description,
                                        image: item.votation.image,
                                        color: item.votation.color,
                                        creator: item.votation.creator,
                                        expiration: item.votation.expiration.toString(),
                                        type_form: item.votation.type_form,
                                        visibility: item.votation.visibility,
                                        user: item.votation.user,
                                        createdAt: item.votation.createdAt.toString()
                                    })}
                                    className="px-3 py-2 bg-green-500 text-white rounded-md flex gap-2"
                                >
                                    <span className='text-sm'>
                                        CSV
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-arrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 15h6" /><path d="M12.5 17.5l2.5 -2.5l-2.5 -2.5" /></svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                )}
            />


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
                        onClose={() => {
                            setIsOpen(false);
                            setId('');
                            getVotationData();
                        }}
                    />
                </ModalWrapper>
            }

            {/* modal add user */}
            {
                <ModalWrapper
                    leftTitle={'Agregar Usuario'}
                    isOpen={show}
                    onClose={() => {
                        setShow(false);
                    }}
                    className="w-96 h-96"
                >
                    <form
                        onSubmit={handleSubmitUser(handleAddUser)}
                        className="flex flex-col gap-2 pt-4 px-2"
                    >
                        {
                            selectedvotation && (
                                <span className="text-sm font-semibold">
                                    "{selectedvotation.title}"
                                </span>
                            )
                        }
                        <input type="email" placeholder="Correo electrónico" className="px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 focus:border-2 border-transparent border-2 w-full"
                            {
                            ...registerUser('email')
                            }
                        />
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            Agregar
                        </button>
                    </form>
                    <div className="flex flex-col py-2 px-2">
                        <span className="text-sm">Lista de usuarios agregados</span>
                        <div className="flex flex-col pt-2">
                            {
                                userByVotation.length === 0 ? (
                                    <span className="text-center">
                                        No hay usuarios agregados
                                    </span>
                                )
                                    :
                                    userByVotation.map((user, index) => (
                                        <div key={index} className="flex justify-between items-center gap-2 bg-gray-900 p-2">
                                            <span className="font-semibold">
                                                {user.email}
                                            </span>
                                            <button
                                                onClick={() => {
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
                                                            handleDeleteUser(user.id);
                                                        }
                                                    });
                                                }}
                                                className="text-red-500">
                                                Eliminar
                                            </button>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </ModalWrapper>
            }
        </>
    )
}
