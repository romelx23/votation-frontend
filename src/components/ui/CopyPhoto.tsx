import copy from "copy-to-clipboard";
import { toPng } from "html-to-image";
import { useRef } from "react";
import { toast } from "sonner";

interface CopyPhotoProps {
    children: React.ReactNode;
}

export const CopyPhoto: React.FC<CopyPhotoProps> = ({ children }) => {
    const componentRef = useRef(null);

    const copyToClipboardAsImage = () => {
        if (componentRef.current === null) {
            return;
        }

        toPng(componentRef.current)
            .then(async (dataUrl) => {
                // Convert the data URL to a blob
                const response = await fetch(dataUrl);
                const blob = await response.blob();

                // Create a new ClipboardItem
                const item = new ClipboardItem({ 'image/png': blob });

                // Copy the item to the clipboard
                navigator.clipboard.write([item])
                    .then(() => {
                        toast.success('Componente copiado al portapapeles como imagen');
                    })
                    .catch((error) => {
                        console.error('Error al copiar la imagen', error);
                        toast.error('Error al copiar la imagen');
                    });
            })
            .catch((error) => {
                console.error('Error al convertir el componente a imagen', error);
            });

        // .then((dataUrl) => {
        //     // Copiar la imagen al portapapeles
        //     // const img = new Image();
        //     // img.src = dataUrl;
        //     // document.body.appendChild(img);
        //     // navigator.clipboard.writeText(img.src);
        //     // document.body.removeChild(img);
        //     copy(dataUrl);
        //     //   alert('Componente copiado al portapapeles como imagen');
        //     toast.success('Componente copiado al portapapeles como imagen');
        // })
        // .catch((error) => {
        //     console.error('Error al copiar la imagen', error);
        // });
    };

    return (
        <div>
            <div
                ref={componentRef}
            // style={{ padding: '20px', border: '1px solid black' }}
            >
                {
                    children
                }
            </div>
            <button
                onClick={copyToClipboardAsImage}
                title='Copiar Foto de la votación'
                className='absolute top-20 right-5 bg-orange-600 border-2 border-transparent hover:border-white py-2 px-2 rounded-full transition-colors'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-photo-scan"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 8h.01" /><path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" /><path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644" /><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /></svg>
            </button>
        </div>
    );
};
