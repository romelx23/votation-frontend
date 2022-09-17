import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks';
import { useForm } from '../../hooks/useForm';
import { AddForm } from '../../interfaces';
import { setConfiguration } from '../../store/slices';

const initialState = {
    name: '',
    description: '',
    image: '',
    cantidad: '',
    autor: '',
    color: '',
}

export const FormConfiguration = () => {
    const { values, handleInputChange: handleChange, setValues } = useForm<AddForm>({
        name: '',
        description: '',
        image: '',
        cantidad: 10,
        autor: '',
        color: '#8b5cf6',
    });
    const dispatch = useAppDispatch();
    const [save, setSave] = useState(false);
    const [message, setMessage] = useState(initialState);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (values.name.trim().length === 0) return setMessage({ ...message, name: 'El nombre es obligatorio' });
        if (values.description.trim().length === 0) return setMessage({ ...message, description: 'La descripción es obligatoria' });
        if (values.cantidad < 1) return setMessage({ ...message, cantidad: 'La cantidad debe ser mayor a 0' });
        console.log('guardado');
        localStorage.setItem('form', JSON.stringify(values));
        setMessage(initialState);
        dispatch(setConfiguration(values));
    }
    const loadForm = () => {
        const form = localStorage.getItem('form');
        if (form) {
            // const { name, description, image, cantidad, autor, color } = JSON.parse(form);
            const formData = JSON.parse(form);
            setValues({ ...formData });
            dispatch(setConfiguration(values));
            setSave(true);
        }
    }

    useEffect(() => {
        loadForm();
    }, [])

    return (
        <div>
            <h1 className='text-center font-semibold text-lg'>Configuración</h1>
            <form
                autoComplete='off'
                onSubmit={handleSubmit}
                className="flex flex-col w-full max-w-[500px]">
                <label htmlFor="cantidad">Nombre del Top</label>
                <input type="text"
                    autoComplete='off'
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    placeholder='Cantidad' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                {
                    message.name && <p className='text-red-500'>{message.name}</p>
                }
                <label htmlFor="cantidad">Descripción del Top</label>
                <input type="text"
                    autoComplete='off'
                    name='description'
                    value={values.description}
                    onChange={handleChange}
                    placeholder='Descripción' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                {
                    message.description && <p className='text-red-500'>{message.description}</p>
                }
                <label htmlFor="cantidad">Cantidad</label>
                <input type="number"
                    autoComplete='off'
                    name='cantidad'
                    value={values.cantidad}
                    onChange={handleChange}
                    placeholder='Cantidad' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                {
                    message.cantidad && <p className='text-red-500'>{message.cantidad}</p>
                }
                <label htmlFor="autor">Autor</label>
                <input type="text"
                    autoComplete='off'
                    name='autor'
                    value={values.autor}
                    onChange={handleChange}
                    placeholder='Autor' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                {
                    message.autor && <p className='text-red-500'>{message.autor}</p>
                }
                <label htmlFor="color">Color(opcional)</label>
                <input type="color"
                    autoComplete='off'
                    name='color'
                    value={values.color}
                    onChange={handleChange}
                    placeholder='Cantidad' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                {
                    message.color && <p className='text-red-500'>{message.color}</p>
                }
                <label htmlFor="image">Imagen</label>
                <input type="text"
                    autoComplete='off'
                    name='image'
                    value={values.image}
                    onChange={handleChange}
                    placeholder='Ingrese imagen' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                {
                    message.image && <p className='text-red-500'>{message.image}</p>
                }
                <div className="flex justify-center pb-4">
                    <img src={values.image ? values.image : 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png'} alt="imagen de la votación" className='w-28 h-28 object-cover' />
                </div>
                <button className='btn h-10 gap-2'>
                    {
                        save ? <>
                            Actualizar
                            <i className="fas fa-sync-alt"></i>
                        </> :
                            <>
                                Guardar Cambios
                                <i className="fas fa-save"></i>
                            </>
                    }
                </button>
            </form>
        </div>
    )
}
