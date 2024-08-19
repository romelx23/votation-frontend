import { Link, useLocation } from "react-router-dom";

interface ActiveLinkProps {
    to: string;
    children: React.ReactNode;
}

export const ActiveLink = ({ to, children }: ActiveLinkProps) => {
    const { pathname } = useLocation();
    console.log(to);
    console.log(pathname);
    return (
        <Link
            to={to}
            className={`${ pathname === to ? 'text-green-500 bg-green-500' : 'text-gray-500' } hover:text-green-500 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
        >
            {children}
        </Link>
    )
}
