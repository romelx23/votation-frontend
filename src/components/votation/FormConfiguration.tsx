import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector, useVotation } from "../../hooks";
import { AddForm, IVotationState } from "../../interfaces";
import { setAnimeListCollection, setConfiguration, setErrorMessage } from "../../store/slices";
import { toast } from "sonner";
import { format } from "date-fns";
import { useAuthStore } from "../../store/auth/authStore";

interface FormConfigurationProps {
    setState: React.Dispatch<React.SetStateAction<number>>;
    isVisible?: boolean;
    votationData?: IVotationState | null;
}

export const FormConfiguration: React.FC<FormConfigurationProps> = ({ setState, isVisible = false, votationData }) => {
    const {
        getValues,
        setValue,
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        trigger,
        reset
    } = useForm<AddForm>({
        defaultValues: {
            name: "",
            description: "",
            image: "",
            cantidad: 10,
            autor: "",
            color: "#8b5cf6",
            expiration: "",
            visibility: true
        },
        // mode: "onChange",
    });

    const dispatch = useAppDispatch();
    const [save, setSave] = useState(false);
    const { user } = useAuthStore();

    const { votation: data } = useAppSelector(state => state.votation);

    const { items, votation } = data;

    const onSubmit = () => {
        console.log('submit');

        if (errors.name || errors.description || errors.image || errors.cantidad || errors.autor || errors.color || errors.expiration) {
            toast.error('Todos los campos son requeridos');
            return;
        }

        setState(2);
    }

    const saveLocalStorage = () => {
        console.log("se cambio");
        console.log(getValues());
        localStorage.setItem("form", JSON.stringify(getValues()));
        dispatch(setConfiguration(getValues()));
        // dispatch(setErrorMessage(errors));
    };

    const loadForm = () => {
        const form = localStorage.getItem("form");
        if (form) {
            const formData = JSON.parse(form);
            setValue("name", formData.name);
            setValue("description", formData.description);
            setValue("image", formData.image);
            setValue("cantidad", formData.cantidad);
            setValue("autor", formData.autor);
            setValue("color", formData.color);
            setValue("expiration", format(new Date(formData.expiration), 'yyyy-MM-dd'));
            console.log(formData);
            dispatch(setConfiguration(formData));
            setSave(true);
        }
    };

    console.log(errors);
    console.log(isValid);


    const setVotationData = () => {
        console.log(votation);
        setValue("name", votation?.title);
        setValue("description", votation?.description);
        setValue("image", votation?.image);
        setValue("cantidad", items.length);
        setValue("autor", votation?.creator);
        setValue("color", votation?.color);
        setValue("expiration", format(new Date(votation?.expiration), 'yyyy-MM-dd'));
        setValue("visibility", votation?.visibility);
    }

    // const setVotationDataProps = () => {
    //     console.log(votationData);
    //     if (votationData) {
    //         setValue("name", votationData?.name);
    //         setValue("description", votationData?.description);
    //         setValue("image", votationData?.image);
    //         setValue("cantidad", votationData.cantidad);
    //         setValue("autor", votationData?.autor);
    //         setValue("color", votationData?.color);
    //         setValue("expiration", votationData?.expiration);
    //         setValue("visibility", true);
    //     }
    // }

    useEffect(() => {
        // if (id===undefined) {
        //     console.log("se monto");
        //     loadForm();
        // }
        console.log(votation);
        if (votation) {
            setVotationData();
        }
        // if (votationData) {
        //     setVotationDataProps();
        // }
    }, [votation]);

    return (
        <div className="flex flex-col w-full max-w-xl">
            <h1 className="text-center font-semibold text-lg">Configuración</h1>
            <button
                onClick={() => {
                    reset();
                    localStorage.removeItem("form");
                    dispatch(setAnimeListCollection([]));
                }}
                title='Limpiar Formulario'
                className='absolute top-20 right-5 bg-blue-600 border-2 border-transparent hover:border-white py-2 px-2 rounded-full transition-colors'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-restore"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3.06 13a9 9 0 1 0 .49 -4.087" /><path d="M3 4.001v5h5" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
            </button>
            <form
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full "
            >
                <label htmlFor="cantidad">Nombre del Top</label>
                <input
                    type="text"
                    autoComplete="off"
                    {...register("name", { required: true })}
                    placeholder="nombre del top"
                    onBlur={saveLocalStorage}
                    className="w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all"
                />
                {errors.name && <p className="text-red-500">Este campo es requerido</p>}
                <label htmlFor="cantidad">Descripción del Top</label>
                <input
                    type="text"
                    autoComplete="off"
                    {...register("description", { required: true })}
                    placeholder="Descripción"
                    className="w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all"
                    onBlur={saveLocalStorage}
                />
                {errors.description && (
                    <p className="text-red-500">Este campo es requerido</p>
                )}
                <label htmlFor="cantidad">Cantidad</label>
                <input
                    type="number"
                    autoComplete="off"
                    {...register("cantidad", {
                        min: { value: 2, message: "La cantidad debe ser mayor a 1" },
                        required: "Este campo es requerido"
                    })}
                    placeholder="Cantidad"
                    className="w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all"
                    onBlur={saveLocalStorage}
                />
                {errors.cantidad && (
                    <p className="text-red-500">
                        {
                            errors.cantidad.message
                        }
                    </p>
                )}
                <label htmlFor="autor">Autor</label>
                <input
                    type="text"
                    autoComplete="off"
                    {...register("autor", { required: true })}
                    placeholder="Autor"
                    className="w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all"
                    onBlur={saveLocalStorage}
                />
                {errors.autor && (
                    <p className="text-red-500">Este campo es requerido</p>
                )}
                <label htmlFor="color">Color(opcional)</label>
                <input
                    type="color"
                    autoComplete="off"
                    {...register("color", { required: true })}
                    placeholder="Cantidad"
                    className="w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all"
                    onBlur={saveLocalStorage}
                />
                {errors.color && (
                    <p className="text-red-500">Este campo es requerido</p>
                )}

                <label htmlFor="color">Fecha de Expiración</label>
                <input
                    type="date"
                    autoComplete="off"
                    {...register("expiration", { required: true })}
                    placeholder="20-10-2025"
                    className="w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all"
                    onBlur={saveLocalStorage}
                />
                {errors.expiration && (
                    <p className="text-red-500">Este campo es requerido</p>
                )}
                {
                    user && isVisible &&
                    <>
                        <label htmlFor="visibility">Visibilidad</label>
                        <select
                            {...register("visibility", { required: true })}
                            className="w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all"
                            onBlur={saveLocalStorage}
                            defaultValue="true"
                        >
                            <option value="true">Público</option>
                            <option value="false">Privado</option>
                        </select>
                        {errors.visibility && (
                            <p className="text-red-500">Este campo es requerido</p>
                        )}
                    </>
                }

                <label htmlFor="image">Imagen(opcional)</label>
                <input
                    type="text"
                    autoComplete="off"
                    {...register("image")}
                    placeholder="Ingrese imagen"
                    className="w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all"
                    onBlur={saveLocalStorage}
                />
                {errors.image && (
                    <p className="text-red-500">Este campo es requerido</p>
                )}
                <div className="flex justify-center pb-4">
                    {
                        watch("image") &&
                        <img
                            src={
                                watch("image")
                                    ? watch("image")
                                    : "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png"
                            }
                            alt="imagen de la votación"
                            className="w-28 h-28 object-cover"
                        />
                    }
                </div>
                {/* <button className="btn h-10 gap-2">
                    {save ? (
                        <>
                            Actualizar
                            <i className="fas fa-sync-alt"></i>
                        </>
                    ) : (
                        <>
                            Guardar Cambios
                            <i className="fas fa-save"></i>
                        </>
                    )}
                </button> */}
                <button className="btn h-10 gap-2">
                    Siguiente Paso
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className=""><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                </button>
            </form>
        </div>
    );
};
