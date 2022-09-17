import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import { AddForm } from '../../interfaces';
import { setConfiguration } from '../../store/slices';

export const FormConfiguration = () => {
    const { getValues, setValue, control, getFieldState, register, handleSubmit, watch, formState: { errors }, trigger, reset } = useForm<AddForm>({
        defaultValues: {
            name: '',
            description: '',
            image: '',
            cantidad: 10,
            autor: '',
            color: '#8b5cf6',
        }
    });
    const dispatch = useAppDispatch();
    const [save, setSave] = useState(false);
    const onSubmit = () => {
        localStorage.setItem('form', JSON.stringify(getValues()));
        dispatch(setConfiguration(getValues()));
    }
    const loadForm = () => {
        const form = localStorage.getItem('form');
        if (form) {
            const formData = JSON.parse(form);
            setValue('name', formData.name);
            setValue('description', formData.description);
            setValue('image', formData.image);
            setValue('cantidad', formData.cantidad);
            setValue('autor', formData.autor);
            setValue('color', formData.color);
            dispatch(setConfiguration(formData));
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
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full max-w-[500px]">
                <label htmlFor="cantidad">Nombre del Top</label>
                <input type="text"
                    autoComplete='off'
                    {...register("name", { required: true })}
                    placeholder='Cantidad' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                {
                    errors.name && <p className='text-red-500'>Este campo es requerido</p>
                }
                <label htmlFor="cantidad">Descripción del Top</label>
                <input type="text"
                    autoComplete='off'
                    {...register("description", { required: true })}
                    placeholder='Descripción' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                {
                    errors.description && <p className='text-red-500'>
                        Este campo es requerido
                    </p>
                }
                <label htmlFor="cantidad">Cantidad</label>
                <input type="number"
                    autoComplete='off'
                    {...register("cantidad", { required: true })}
                    placeholder='Cantidad' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                {
                    errors.cantidad && <p className='text-red-500'>Este campo es requerido
                    </p>
                }
                <label htmlFor="autor">Autor</label>
                <input type="text"
                    autoComplete='off'
                    {...register("autor", { required: true })}
                    placeholder='Autor' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                {
                    errors.autor && <p className='text-red-500'>Este campo es requerido
                    </p>
                }
                <label htmlFor="color">Color(opcional)</label>
                <input type="color"
                    autoComplete='off'
                    {...register("color", { required: true })}
                    placeholder='Cantidad' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                {
                    errors.color && <p className='text-red-500'>Este campo es requerido
                    </p>
                }
                <label htmlFor="image">Imagen</label>
                <input type="text"
                    autoComplete='off'
                    {...register("image", { required: true })}
                    placeholder='Ingrese imagen' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                {
                    errors.image && <p className='text-red-500'>Este campo es requerido
                    </p>
                }
                <div className="flex justify-center pb-4">
                    <img src={watch('image') ? watch('image') : 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png'} alt="imagen de la votación" className='w-28 h-28 object-cover' />
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
