import React, { FC } from 'react';
import { Pagination } from '../../ui/Pagination';
import { usePagination } from '../../../hooks/usePagination';

type TableProps<T> = {
    title?: string;
    headers: string[];
    ComponentRigth?: React.ReactNode;
    ComponentLeft?: React.ReactNode;
    items: T[];
    renderRow?: (item: T, index: number) => React.ReactNode;
    // itemsPerPage: number;
    totalItems: number;
    ContentTable?: React.ReactNode;
    // currentPage: number;
    paginate: (pageNumber: number) => void;
}

export function TableGeneral<T>({
    title,
    ComponentRigth,
    ComponentLeft,
    headers,
    items,
    renderRow,
    ContentTable,
    totalItems,
    paginate
}: TableProps<T>) {

    const {
        // currentData,
        // currentPage,
        // jump
        itemsPerPage,
    } = usePagination(items, 5);

    return (
        <>
            <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{title}</h1>
                <div className="flex justify-between">
                    <>
                        {ComponentLeft}
                    </>
                    <>
                        {ComponentRigth}
                    </>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr
                            className=''
                        >
                            {headers.map((header, index) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.length === 0 && (
                                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td colSpan={
                                        headers.length
                                    } className="text-center py-4">
                                        No hay votaciones
                                    </td>
                                </tr>
                            )
                        }
                        {
                            renderRow &&
                            <>
                                {items.map((item, index) => renderRow(item, index))}
                            </>
                        }
                        {
                            ContentTable && ContentTable
                        }
                    </tbody>
                </table>
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    paginate={paginate}
                // currentPage={currentPage}
                />
            </div>
        </>

    );
};