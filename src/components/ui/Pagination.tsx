import { FC, useState } from "react";

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginate: (number: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (number: number) => {
        setCurrentPage(number);
        paginate(number);
    };

    return (
        <nav>
            <ul className="flex justify-center mt-4">
                {pageNumbers.map((number) => (
                    <li key={number} className="">
                        <a
                            onClick={() => handleClick(number)}
                            href="#"
                            className={`block p-2 px-3 border ${ currentPage === number ? 'bg-gray-800 text-white' : 'hover:bg-gray-800' }`}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};