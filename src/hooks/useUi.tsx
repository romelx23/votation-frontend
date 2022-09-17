import React from 'react'
import { setShow } from '../store/slices';
import { useAppDispatch } from './redux/useAppDispatch';

export const useUi = () => {
    const dispatch = useAppDispatch();
    const handleShow = (show: boolean) => {
        dispatch(setShow(show));
    }
    return {
        handleShow
    }
}
