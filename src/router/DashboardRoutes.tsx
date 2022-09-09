import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { HomePage, NotFoundPage, SelectedPage, VotationPage } from '../pages';
export const DashboardRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/seleccionar-animes' element={<SelectedPage />} />
                <Route path='/votar/:id' element={<VotationPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}
