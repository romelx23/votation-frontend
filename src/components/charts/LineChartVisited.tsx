import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
    labels?: string[];
    dataLine?: number[];
    title?: string;
}

export const LineChart: FC<LineChartProps> = ({ labels, dataLine, title }) => {
    const data = {
        labels: labels ? labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: title ? title : 'Sales 2024 (M$)',
                data: dataLine ? dataLine : [0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                pointBackgroundColor: 'rgba(75,192,192,1)',
                pointBorderColor: '#fff',
                pointRadius: 5, // Tamaño normal de las bolitas
                pointHoverRadius: 10, // Tamaño al hacer hover
                fill: true,
            },
        ],
    };

    const options = {
        // responsive: true,
        plugins: {
            legend: {
                position: 'top' as const, // Cambia esto a una opción de tipo estricto
            },
            title: {
                display: true,
                text: title ? title : 'Monthly Sales Data',
                font: {
                    family: 'Arial',
                    size: 20,
                    weight: 'bold',
                    lineHeight: 1.2,
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0,0,0,0.7)', // Color de fondo
                titleColor: '#fff', // Color del título
                bodyColor: '#fff', // Color del cuerpo del texto
                borderColor: 'rgba(255,255,255,0.5)', // Color del borde
                borderWidth: 1, // Ancho del borde
                titleFont: {
                    family: 'Arial', // Fuente del título
                    size: 16, // Tamaño del título
                },
                bodyFont: {
                    family: 'Arial', // Fuente del cuerpo
                    size: 14, // Tamaño del cuerpo
                },
                padding: 10, // Espaciado interno
                cornerRadius: 5, // Radio de los bordes redondeados
            },
        },
    };

    return <Line
        data={data}
        options={options}
        height={75}
    />;
};
