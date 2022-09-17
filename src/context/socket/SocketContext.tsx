import { createContext } from 'react';
import { Votation } from '../../interfaces';

interface ContextProps {
    online: boolean,
    createVotation: (votation: Votation) => void,
    getVotations: () => void,
    incrementVote: (ids: string[], idVotation: string) => void
}

export const SocketContext = createContext({} as ContextProps)