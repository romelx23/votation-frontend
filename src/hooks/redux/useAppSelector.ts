import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { TypedUseSelectorHook } from './../../../node_modules/react-redux/es/types.d';
// import { RootState } from '../store/store';
// import { TypedUseSelectorHook } from './../../node_modules/react-redux/es/types.d';
export const useAppSelector:TypedUseSelectorHook<RootState> =useSelector