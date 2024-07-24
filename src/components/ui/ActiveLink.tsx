import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

interface ActiveLinkProps {
    route: string;
    routes: string[];
    children?: React.ReactNode;
    className?: string;
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({ route, routes, children, className }) => {

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
            className={`${ className } 
    ${ routes.includes(location.split('/')[1]) ? 'active' : '' }`}>
            {children}
        </NavLink>
    )
}
