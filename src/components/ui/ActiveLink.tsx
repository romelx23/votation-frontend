import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

interface ActiveLinkProps {
    route: string;
    routes: string[];
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({ route, routes }) => {

    console.log(routes);
    console.log(route);
    console.log(routes.includes(route));

    const location = useLocation().pathname;
    console.log(location);
    console.log(location.split('/')[1]);

    return (
        // if routes includes route, add active class
        <NavLink
            to={route}
            className={`text-2xl font-semibold mr-4 text-white hover:text-indigo-600
    ${ routes.includes(location.split('/')[1]) ? 'active' : '' }`}>
            Votaciones
        </NavLink>
    )
}
