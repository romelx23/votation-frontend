import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { IUser, IVotations } from '../../../../interfaces';
import { useForm, UseFormRegister } from 'react-hook-form';
import { toast } from 'sonner';
import { formatInTimeZone } from 'date-fns-tz';

interface Props {
    currentItems: IVotations[];
    itemsPerPage: number;
    currentPage: number;
    handleToggle: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    handleExportCSV: (votation: IVotations) => void;
    handleModalOpenCopy: (votation: IVotations) => void;
    handleModalOpenEdit: (votation: IVotations) => void;
    handleDelete: (id: string) => void;
    setShow: (show: boolean) => void;
    setSelectedVotation: (votation: IVotations) => void;
    show: boolean;
    user: IUser | null;
    baseUrl: string;
}

export const ItemsVotation: FC<Props> = ({ currentItems, itemsPerPage, currentPage, handleToggle, handleExportCSV, handleModalOpenCopy, handleModalOpenEdit, handleDelete, setShow, setSelectedVotation, show, user, baseUrl }) => {

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


    return (
        <>
            {
                currentItems &&
                currentItems.map((votation, index) => (
                    <ItemVote
                        key={index}
                        votation={votation}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        index={index}
                        handleToggle={handleToggle}
                        handleExportCSV={handleExportCSV}
                        baseUrl={baseUrl}
                        setShow={setShow}
                        setSelectedVotation={setSelectedVotation}
                        show={show}
                        handleModalOpenCopy={handleModalOpenCopy}
                        handleModalOpenEdit={handleModalOpenEdit}
                        handleDelete={handleDelete}
                        registerVisible={registerVisible}
                        user={user}
                    />
                ))
            }
        </>
    )
}

interface ItemVoteProps {
    votation: IVotations;
    itemsPerPage: number;
    currentPage: number;
    index: number;
    handleToggle: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
    handleExportCSV: (votation: IVotations) => void;
    baseUrl: string;
    setShow: (show: boolean) => void;
    setSelectedVotation: (votation: IVotations) => void;
    show: boolean;
    handleModalOpenCopy: (votation: IVotations) => void;
    handleModalOpenEdit: (votation: IVotations) => void;
    handleDelete: (id: string) => void;
    registerVisible: UseFormRegister<{
        visibility: boolean;
    }>;
    user: IUser | null;
}

const ItemVote: FC<ItemVoteProps> = ({
    votation, itemsPerPage, currentPage, index, handleToggle, handleExportCSV, baseUrl,
    setShow, setSelectedVotation, show, handleModalOpenCopy, handleModalOpenEdit, handleDelete,
    registerVisible, user
}) => {

    const [openTooltip, setOpenTooltip] = useState<string | null>(null);

    const tooltipRef = useRef<HTMLDivElement>(null);

    // if salgo del tooltip, se debe cerrar

    const handleClickOutside = (event: Event) => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
            setOpenTooltip(null);
        }
    };

    // Use the native `addEventListener` with `mousedown` event
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <tr
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
                    formatInTimeZone(new Date(votation.createdAt), 'UTC', 'yyyy-MM-dd')
                }
            </td>
            <td className="px-6 py-4">
                {
                    formatInTimeZone(new Date(votation.expiration), 'UTC', 'yyyy-MM-dd')
                }
            </td>
            <td className="px-6 py-4 text-right space-x-2">
                <div className="flex flex-wrap gap-1 relative">

                    {
                        openTooltip === votation.uid &&
                        <div className="absolute bottom-10 right-[70px] p-3 rounded-md bg-gray-800 flex flex-wrap gap-2 w-[180px] border"
                            // onBlur={handleClickOutside}
                            ref={tooltipRef}
                        >
                            <button
                                title="Copiar link"
                                onClick={() => {
                                    navigator.clipboard.writeText(`${ baseUrl }/votar/${ votation.uid }`);
                                    toast.success('Link copiado correctamente');
                                }}
                                className="font-medium text-purple-600 dark:text-purple-500 hover:underline">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
                            </button>

                            <button
                                title="Exportar CSV"
                                onClick={() => {
                                    handleExportCSV(votation)
                                }}
                                className="font-medium text-green-600 dark:text-green-500 hover:underline">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-arrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 15h6" /><path d="M12.5 17.5l2.5 -2.5l-2.5 -2.5" /></svg>

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

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-share"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M8.7 10.7l6.6 -3.4" /><path d="M8.7 13.3l6.6 3.4" /></svg>

                            </button>
                            <button
                                title="Agregar usuario al formulario"
                                onClick={() => {
                                    setShow(!show);
                                    setSelectedVotation(votation);
                                }}
                                className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>

                            </button>

                            <button
                                title="Copiar Formulario"
                                onClick={() => {
                                    handleModalOpenCopy(votation)
                                }}
                                className="font-medium text-sky-600 dark:text-sky-500 hover:underline">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-folders"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" /></svg>

                            </button>
                        </div>

                    }

                    <button
                        title="More"
                        onClick={() => {
                            setOpenTooltip(openTooltip === votation.uid ? null : votation.uid)
                        }}
                        className="font-medium text-sky-600 dark:text-sky-500 hover:underline">

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                    </button>

                    <button
                        title="Editar"
                        onClick={() => {
                            handleModalOpenEdit(votation)
                        }}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                    </button>

                    {
                        user?.role === "ADMIN_ROLE" || (user && user.uid === votation.user)
                        &&
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
    )
}