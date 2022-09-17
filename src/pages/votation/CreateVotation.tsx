import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { VotationLayout } from '../../components'
import { useVotation } from '../../hooks';

type Inputs = {
    name: string;
    description: string;
    image: string;
    color: string;
    cantidad: number;
    autor: string;
    items: Items[];
};

interface Items {
    name: string;
    image: string;
}

type State = 'add-data' | 'add-items' | 'success'

export const CreateVotation = () => {
    const [state, setState] = useState<State>('add-data');
    const { handleCreateVotation } = useVotation();
    const navigate = useNavigate();
    const { getValues, setValue, register, handleSubmit, watch, formState: { errors }, trigger, reset } = useForm<Inputs>({
        defaultValues: {
            name: '',
            description: '',
            image: '',
            color: '',
            cantidad: 10,
            autor: '',
            items: [{ name: '', image: '' }],
        }
    });
    const [save, setSave] = useState(false);
    const [items, setItems] = useState<Items[]>([{ name: '', image: '' }]);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        // setSave(true);
        const votation = {
            title: data.name,
            description: data.description,
            image: data.image,
            color: data.color,
            creator: data.autor,
            items: data.items
        }
        handleCreateVotation(votation);
        reset();
        navigate('/');
    }
    const addIem = () => {
        setItems([...items, { name: '', image: '' }]);
    }
    const removeItem = (index: number) => {
        const newItems = items.filter((item, i) => i !== index);
        setItems(newItems);
        const formItems = getValues('items').filter((item: Items, i: number) => i !== index);
        setValue('items', formItems);
    }

    const handleFormChange = (state: State) => {
        trigger();
        const { name, description, image, color, cantidad, autor, items } = watch();
        // console.log(name, description, image, color, cantidad, autor, items);
        console.log(errors);
        console.log(!errors.items);
        if (state === 'add-items') {
            if (name.length === 0 || description.length === 0 || image.length === 0 || cantidad === 0 || autor.length === 0) return;
            setState(state);
            console.log('add-items');
        }
        if (state === 'success') {
            if (name.length === 0 || description.length === 0 || image.length === 0 || cantidad === 0 || autor.length === 0 || items.length <= 1) return;
            setState(state);
        }
    }

    const widthProgress = state === 'add-data' ? 'w-1/3' : state === 'add-items' ? 'w-2/3' : 'w-full';
    const step = state === 'add-data' ? 'Paso 1' : state === 'add-items' ? 'Paso 2' : 'Paso 3';

    return (
        <VotationLayout>
            <div className="w-full flex flex-col justify-center items-center my-4">
                <h1 className='text-lg font-semibold'>Cree su votación</h1>
                <p className='text-center font-semibold'>{step}</p>
                <div className="w-full h-5 border-2 border-white rounded-xl max-w-[500px]">
                    <div className={`h-full transition-all delay-100 bg-blue-500 rounded-xl ${widthProgress}`}></div>
                </div>
                <form
                    autoComplete='off'
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col w-full max-w-[500px] px-4 md:px-0 mb-12 md:mb-0">
                    {
                        <div className={`flex flex-col ${state === 'add-data' ? 'block' : 'hidden'}`}>

                            <p className='font-semibold text-left py-2'>Datos de la votación:</p>
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
                                errors.description && <p className='text-red-500'>Este campo es requerido</p>
                            }
                            <label htmlFor="cantidad">Cantidad ( Máxima 20 artículos )</label>
                            <input type="number"
                                autoComplete='off'
                                {...register("cantidad", {
                                    required: {
                                        value: true,
                                        message: 'Este campo es requerido'
                                    },
                                    max: {
                                        value: 20,
                                        message: 'La cantidad máxima es 20'
                                    }
                                })}

                                placeholder='Cantidad' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                            {
                                errors.cantidad && <p className='text-red-500'>
                                    {errors.cantidad.message}
                                </p>
                            }
                            <label htmlFor="autor">Autor</label>
                            <input type="text"
                                autoComplete='off'
                                {...register("autor", { required: true })}
                                placeholder='Autor' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                            {
                                errors.autor && <p className='text-red-500'>Este campo es requerido</p>
                            }
                            <label htmlFor="color">Color(opcional)</label>
                            <input type="color"
                                autoComplete='off'
                                {...register("color")}
                                placeholder='Cantidad' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                            {
                                errors.color && <p className='text-red-500'>Este campo es requerido</p>
                            }
                            <label htmlFor="image">Imagen</label>
                            <input type="text"
                                autoComplete='off'
                                {...register("image", { required: true })}
                                placeholder='Ingrese imagen' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                            {
                                errors.image && <p className='text-red-500'>Este campo es requerido</p>
                            }
                            <div className="flex justify-center pb-4">
                                <img src={watch('image') ? watch('image') : 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png'} alt="imagen de la votación" className='w-28 h-28 object-cover' />
                            </div>
                            <button
                                type='button'
                                onClick={() => handleFormChange('add-items')}
                                className='w-full py-2 px-3 my-4 shadow-lg hover:shadow-indigo-600 transition-all bg-blue-500 text-white font-semibold rounded-md'>Siguiente</button>
                        </div>
                    }
                    {
                        <div className={`${state === 'add-items' ? 'block' : 'hidden'}`}>
                            <div className="flex">
                                <button
                                    type='button'
                                    title='atras'
                                    onClick={() => setState('add-data')}
                                    className='w-18 py-2 px-3 my-4 shadow-lg hover:shadow-indigo-600 transition-all bg-gray-500 text-white font-semibold rounded-md'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>

                                </button>
                            </div>
                            <p className='font-semibold text-left py-2'>Artículos:</p>
                            <div className="w-full flex flex-col">
                                <div className=" flex items-center justify-between">
                                    <p className='font-semibold text-left'>Ingrese los Items para la votación: (Mínimo 2 items)</p>
                                    <button
                                        onClick={addIem}
                                        type='button' className='w-12 rounded-md py-2 px-3 my-1 
                            shadow-lg focus:shadow-indigo-600 transition-all bg-indigo-600 text-white'>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                                <p className=''>Cantidad: {items.length} / {watch('cantidad') <= 20 ? watch('cantidad') : 20}</p>
                            </div>
                            <div className="overflow-x-hidden">
                                {
                                    items.map((item, index) => (
                                        <div key={index} className="flex flex-col">
                                            <div className="flex justify-between">
                                                <label htmlFor="name">Nombre</label>
                                                {
                                                    items.length > 1 &&
                                                    <button
                                                        onClick={() => removeItem(index)}
                                                        type='button' className='w-12 rounded-md py-2 px-3 my-1
                                                shadow-lg focus:shadow-indigo-600 transition-all bg-red-600 text-white'>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                }
                                            </div>
                                            <input type="text"
                                                autoComplete='off'
                                                {...register(`items.${index}.name`, { required: true })}
                                                placeholder='Nombre' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                                            {
                                                errors.items && <p className='text-red-500'>Este campo es requerido</p>
                                            }
                                            <label htmlFor="image">Imagen</label>
                                            <input type="text"
                                                autoComplete='off'
                                                {...register(`items.${index}.image`, { required: true })}
                                                placeholder='Ingrese imagen' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                                            {
                                                errors.items && <p className='text-red-500'>Este campo es requerido</p>
                                            }
                                            <div className="flex justify-center pb-4">
                                                <img src={watch(`items.${index}.image`) ? watch(`items.${index}.image`) : 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png'} alt="imagen de la votación" className='w-28 h-28 object-cover' />
                                            </div>
                                        </div>
                                    ))
                                }
                                <button
                                    type='button'
                                    onClick={() => handleFormChange('success')}
                                    className='w-full py-2 px-3 my-4 shadow-lg hover:shadow-indigo-600 transition-all bg-blue-500 text-white font-semibold rounded-md'>Siguiente</button>
                            </div>
                        </div>
                    }
                    {
                        <div className={`flex flex-col items-start my-2 py-2 ${state === "success" ? 'block' : 'hidden'}`}>
                            <button
                                type='button'
                                title='atras'
                                onClick={() => setState('add-items')}
                                className='w-18 py-2 px-3 my-4 shadow-lg hover:shadow-indigo-600 transition-all bg-gray-500 text-white font-semibold rounded-md'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>

                            </button>
                            <div className="w-full h-60 flex flex-col justify-center items-center mb-4">
                                <p className='font-semibold text-lg text-left py-2'>Votación creada con éxito</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 stroke-purple-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                                </svg>
                            </div>

                            <button
                                type='submit'
                                className='btn w-full h-10 gap-2'>
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
                        </div>
                    }
                </form>
            </div>
        </VotationLayout>
    )
}
