import { useAppSelector, useVotation } from "../../hooks";

// name: "",
// description: "",
// image: "",
// cantidad: 0,
// color: "",
// autor: "",

export const ConfirmationPage = () => {

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
    const { handleSubmmit } = useVotation();
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

                    <div className="flex flex-col gap-2">
                        <h1 className="text-lg font-semibold mb-2 border-b">Animes Añadidos</h1>
                        {
                            animeList.length === 0 &&
                            <p>No hay animes añadidos</p>
                        }
                        {animeList.map((anime, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <img
                                    src={anime?.image}
                                    alt={anime.title}
                                    className="w-20 h-20 object-cover"
                                />
                                <h1 className="text-lg font-semibold">{anime.title}</h1>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={handleSubmmit}
                    className="btn h-10 gap-2 w-full mt-3">
                    Publicar Encuesta
                </button>
            </div>
        </>
    );
};
