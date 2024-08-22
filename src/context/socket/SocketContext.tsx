import { createContext } from 'react';
import { Votation, VotationCreate } from '../../interfaces';

interface ContextProps {
    online: boolean,
    createVotation: (votation: VotationCreate) => void,
    getVotations: () => void,
    incrementVote: (ids: string[], idVotation: string) => void
}

export const SocketContext = createContext({} as ContextProps)