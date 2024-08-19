import { FC } from "react";
import { useAppDispatch, useAppSelector, useVotation } from "../../hooks";
import { ISelectedAnime } from "../../interfaces";
import { deleteAnime } from "../../store/slices";

// name: "",
// description: "",
// image: "",
// cantidad: 0,
// color: "",
// autor: "",

interface ConfirmationPageProps {
    id?: string;
}

export const ConfirmationPage: FC<ConfirmationPageProps> = ({ id }) => {

    const {
        animeList,
        configuration: {
            cantidad,
            name,
            description,
            image,
            color,
            autor,
        },
    } = useAppSelector((state) => state.anime);
    const { handleCreateVotationAnime, handleUpdateVotationAnime } = useVotation();

    const dispatch = useAppDispatch();
    const handleDelete = (ani: ISelectedAnime) => {
        dispatch(deleteAnime(ani.mal_id));
    }

    return (
        // listame todos los datos del formulario y de los animes escogidos
        <>
            <div className="flex flex-col items-center pt-4 w-full max-w-xl">
                <h1 className="text-lg font-semibold">Confirmación de Animes</h1>
                <div className="flex flex-col items-center w-full max-w-xl">
                    <div className="w-full flex flex-col">
                        <h1 className="text-lg font-semibold border-b mb-2">Configuración</h1>
                        <p><span className="font-bold text-sm">Nombre del Top:</span> {name}</p>
                        <p><span className="font-bold text-sm">Descripción del Top:</span> {description}</p>
                        <p><span className="font-bold text-sm">Cantidad de animes a escoger:</span> {cantidad}</p>
                        <p><span className="font-bold text-sm">Color del Top:</span> {color}</p>
                        <p><span className="font-bold text-sm">Autor:</span> {autor}</p>
                        <img src={image} alt={name} className="w-20 h-20 object-cover" />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                        <h1 className="text-lg font-semibold mb-2 border-b">Animes Añadidos</h1>
                        {
                            animeList.length === 0 &&
                            <p>No hay animes añadidos</p>
                        }
                        {animeList.map((anime, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <div className="flex gap-1 flex-1">
                                    <img
                                        src={anime?.image}
                                        alt={anime.title}
                                        className="w-20 h-20 object-cover"
                                    />
                                    <h1 className="text-lg font-semibold">{anime.title}</h1>
                                </div>
                                <button
                                    onClick={() => handleDelete(anime)}
                                    className="btn gap-0.5"
                                >
                                    Eliminar
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        <path d="M9 12l6 0" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {
                    id &&
                    <button
                        onClick={() => handleUpdateVotationAnime(id)}
                        className="btn h-10 gap-2 w-full mt-3">
                        Actualizar Encuesta
                    </button>
                }
                {
                    !id &&
                    <button
                        onClick={handleCreateVotationAnime}
                        className="btn h-10 gap-2 w-full mt-3">
                        Publicar Encuesta
                    </button>
                }
                {/* <button
                    onClick={handleCreateVotationAnime}
                    className="btn h-10 gap-2 w-full mt-3">
                    Publicar Encuesta
                </button> */}
            </div>
        </>
    );
};
