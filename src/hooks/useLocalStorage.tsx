import { Configuration, setConfiguration } from '../store/slices';
import { useAppDispatch } from './redux/useAppDispatch';
export const useLocalSotarage = () => {
    const dispatch = useAppDispatch();
    const handleStorage = () => {
        const form = localStorage.getItem('form');
        if (form) {
            const { name, description, cantidad, color, autor, image, expiration }: Configuration = JSON.parse(form);
            dispatch(setConfiguration({ name, description, cantidad, color, autor, image, expiration }));
        }
    }

    return {
        handleStorage
    }
}