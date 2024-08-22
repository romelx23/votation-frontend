import { useState } from "react";

export function usePagination<T>(data: T[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);
    const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const next = () => {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    };
    const prev = () => {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    };
    const jump = (page: number) => {
        const pageNumber = Math.max(1, page);
        setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
    };
    return {
        next,
        prev,
        jump,
        currentData,
        currentPage,
        maxPage,
        itemsPerPage
    };
}