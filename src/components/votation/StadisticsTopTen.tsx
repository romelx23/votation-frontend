import React, { useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useAppSelector } from '../../hooks';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const StadisticsTopTen = () => {

    const { votation: { items } } = useAppSelector(state => state.votation);

    const options = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                backgroundColor: '#ffffff', // Set bar color to white
                borderWidth: 2,
            },
        },
        responsive: true, // Ensures chart resizes responsively
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: false, // Hide title
            },
        },
        scales: {
            x: { // Adjust x-axis for label fitting
                ticks: {
                    autoSkip: false, // Don't automatically skip labels
                    // maxRotation: 90, 
                    // minRotation: 45,
                    font: {
                        size: 16, // Set font size for labels
                        color: '#ffffff' // Set font color to white
                    }
                },
            },
            y: {
                callback: function (value: any) {
                    // Wrap the label text to fit within the chart
                    const words = value.split(' ');
                    const maxWidth = 15; // Define a maximum label length for wrapping
                    let lines = [];
                    let currentLine = words[0];

                    for (let i = 1; i < words.length; i++) {
                        const word = words[i];
                        if (currentLine.length + word.length + 1 <= maxWidth) {
                            currentLine += ' ' + word;
                        } else {
                            lines.push(currentLine);
                            currentLine = word;
                        }
                    }
                    lines.push(currentLine);
                    return lines.join('\n');
                },
                ticks: {
                    font: {
                        size: 16, // Set font size for labels
                        color: '#ffffff' // Set font color to white
                    },
                    beginAtZero: true // Start y-axis at zero
                },
                afterFit: (axis: any) => {
                    axis.width = 200; // Set a fixed width for the y-axis to accommodate long labels
                }
            }
        },
    };

    // Obtener el top 10 de las votaciones
    const topItems = items
        .slice() // Crear una copia de los items
        .sort((a, b) => b.votes - a.votes) // Ordenar por número de votos descendente
        .slice(0, 10); // Seleccionar los primeros 10

    const labels = topItems.map(item => item.name);
    const colors = topItems.map(item => {
        const color = Math.floor(Math.random() * 16777215).toString(16);
        return `#${ color }`;
    });

    const values = topItems.map(item => item.votes);

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: values,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                color: colors,
            }
        ],
    };



    return (
        <div className='flex flex-col items-center w-full px-8'>
            <h1 className='text-2xl text-center font-semibold'>Estadísticas</h1>
            <div className="flex w-full max-w-5xl flex-col md:flex-row flex-wrap">
                <div className="w-full max-w-5xl">
                    <Bar
                        data={data}
                        options={options}
                        width={150}
                        height={150}
                    />
                </div>
                <div className='flex flex-grow flex-wrap gap-10 my-3 place-content-center'>
                    {
                        topItems.map((item, index) => (
                            <div key={item.uid} className='flex flex-col items-center gap-2 py-3 px-2'>
                                {/* <img src={item.image} alt={item.name} className='w-14 h-14 rounded-full object-cover' /> */}
                                <img src={item.image} alt={item.name} className='w-32 h-48 rounded-sm object-cover' />
                                <p
                                    className='overflow-hidden overflow-ellipsis w-28 flex-grow-[1]'
                                >{item.name.slice(0, 25)}</p>

                                <p className='font-semibold text-2xl flex-grow-[2] flex items-end'>{item.votes}</p>

                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}
