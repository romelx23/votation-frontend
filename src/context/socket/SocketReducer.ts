import { SocketState } from './SocketProvider';

type SocketActionType = 
| {type:'[Socket] - Connect'}

export const SocketReducer = (state:SocketState,action:SocketActionType):SocketState => { 
    switch (action.type) {
        case '[Socket] - Connect':
            return {
                ...state,
            };
    
        default:
            return state;
    }
 }