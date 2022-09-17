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
export const Stadistics = () => {

    const { votation: { items, votation } } = useAppSelector(state => state.votation);

    const options = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };

    const labels = items.map(item => item.name);
    const colors = items.map(item => {
        const color = Math.floor(Math.random() * 16777215).toString(16);
        return `#${color}`;
    });

    const values = items.map(item => item.votes);

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
            }
        ],
    };

    return (
        <div className='flex flex-col items-center w-full px-8'>
            <h1 className='text-2xl text-center font-semibold'>Estadísticas</h1>
            <div className="flex w-full max-w-5xl flex-col md:flex-row">
                <div className="w-full max-w-2xl">
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>
                <div className='flex flex-grow flex-col'>
                    {
                        items.map((item, index) => (
                            <div key={item.uid} className='flex flex-col items-center justify-center gap-2'>
                                <img src={item.image} alt={item.name} className='w-10 h-10 rounded-full' />
                                <p
                                    className='overflow-hidden overflow-ellipsis w-28'
                                >{item.name}</p>
                                <p className='font-semibold text-lg'>{item.votes}</p>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}
