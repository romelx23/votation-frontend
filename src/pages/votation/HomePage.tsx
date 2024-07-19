import React from 'react'
import { VotationLayout, VotationsSearchPage } from '../../components'

export const HomePage = () => {
    // En esta página se muestra la lista de votaciones disponibles
    return (
        <VotationLayout>
            <VotationsSearchPage />
        </VotationLayout>
    )
}
