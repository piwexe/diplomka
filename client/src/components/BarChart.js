import React, { useState, useContext, useEffect, useRef} from 'react';
import { Bar } from "react-chartjs-2";
import style from './BarChart.module.css';
import { Chart as ChartJS } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const BarChart = observer(() => {
    const chartRef = useRef(null); 
    const {user} = useContext(Context);
    
    const [chartData, setChartData] = useState({
        datasets: [],
    });
    const [legendData, setLegendData] = useState([]);
    const [options, setOptions] = useState({});

    const getColorByRawRollId = (rawRollId) => {
        const colors = {
            1: 'rgba(54, 162, 235)', 
            2: 'rgba(255, 99, 132)', 
            3: 'rgba(75, 192, 192)',  
            4: 'rgba(255, 159, 64)',
            5: 'rgba(153, 102, 255)',
        };
        return colors[rawRollId] || 'rgba(63, 210, 255)'; // Цвет по умолчанию
    };
    const getLegendData = (dataCalendar) => {
        const colorMap = new Map();
        dataCalendar.forEach(item => {
            const colorKey = item.rawRollId; // Получаем rawRollId
            if (!colorMap.has(colorKey)) {
                const color = getColorByRawRollId(colorKey);
                const label = user.rawData.find(data => data.id === colorKey)?.name || 'Неизвестный';
                colorMap.set(colorKey, { color, label });
            }
        });
        return Array.from(colorMap.values()); // Возвращаем массив уникальных значений
    };
    const CustomLegend = ({ legendData, toggleDatasetVisibility }) => {
        return (
            <div className={style.customlegend}>
                {legendData.map((item, index) => (
                     <div key={index} onClick={() => toggleDatasetVisibility(index)} style={{
                        display: 'flex',
                        marginTop: 10
                    }}>
                        <span style={{
                            backgroundColor: item.color,
                            width: 20,
                            height: 20,
                            display: 'inline-block',
                            marginRight: 10,
                            marginLeft: 10
                        }}></span>
                        <span style={{
                        fontSize: '18px', // Увеличенный размер шрифта для текста
                        fontWeight: 'bold' // Жирный шрифт для текста
                    }}>
                        {item.label}
                    </span>
                    </div>
                ))}
            </div>
        );
    };
    function toggleDatasetVisibility(chartRef, index) {
        
    }
    useEffect(() => {
        if (user.dataCalendar && user.dataCalendar.length) {
            const timestamps = user.dataCalendar.map(data => new Date(data.time));
            //Находим минимальное и максимальное значения времени
           const minTime = new Date(Math.min(...timestamps));
           const maxTime = new Date(Math.max(...timestamps));
       
            // Устанавливаем время этой даты на 8 утра
            const minX = new Date(minTime.setHours(8, 0, 0, 0));
            const maxX = new Date(maxTime.setHours(18, 0, 0, 0));
       
           const maxLenght = Math.max(...user.dataCalendar.map((data) => data.length)) * 1.4;
            setChartData({
                labels: user.dataCalendar.map((data) => data.time),
                datasets: [{
                    label: "Длина намотки",
                    data: user.dataCalendar.map((data) => ({
                        x: data.time,
                        y: data.length,
                    })),
                    backgroundColor: user.dataCalendar.map((data) => getColorByRawRollId(data.rawRollId)),
                    categoryPercentage: 1,
                    barPercentage: 1,
                }],
            });

            setOptions({
                responsive: true,
                animation: {
                    duration: 500,
                    easing: 'easeInOutQuart'
                },
                scales: {
                    x: {
                        type: 'time', // Указываем, что тип оси X - временной
                        time: {
                            unit: 'minute',
                            tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
                            displayFormats: {
                                minute: 'HH:mm' // Например, 'Mar 26, 2024 15:00'
                            },
                        },
                        ticks: {
                            source: 'auto',
                            font: {
                                color: 'black',
                                size: 14,
                                weight: 'bold',
                            },
                            stepSize: 10,
                            //autoSkip: true,
                        },
                        min: minX,
                        max: maxX,
                        grid: {
                            drawTicks: true,
                            tickLength: 5,
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                color: 'black',
                                size: 14,
                                weight: 'bold',
                                // Шаг между значениями на оси Y
                            },
                            stepSize: 10,
                        },
                        max: maxLenght, // Установка максимального значения для оси Y
                        grid: {
                            drawTicks: true,
                            tickLength: 5,
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                        // labels: {
                        //     color: 'black',                 // цвет текста метки
                        //     boxWidth: 20,                 // ширина ящика метки
                        //     font: {
                        //         size: 20,                 // размер шрифта метки
                        //         weight: 'bold',            // стиль шрифта метки (например, 'bold')
                        //     },
                        // }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0,0,0,0.7)', // фон всплывающей подсказки
                        titleFont: {                        // стили для заголовка всплывающей подсказки
                            size: 16,
                            weight: 'bold',
                        },
                        bodyFont: {                         // стили для основного текста всплывающей подсказки
                            size: 14
                        }
                    }
                }
            });
            const newLegendData = getLegendData(user.dataCalendar);
            setLegendData(newLegendData);  
        }else {
            // Скрыть оси, если данных нет
              setOptions({
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
              });
            }
    }, [user.dataCalendar]); // Зависимость от user.dataCalendar
    

return (
    <div className={style.mainChart}>
        {user.dataCalendar && user.dataCalendar.length > 0 ? (
            <>
            <Bar ref={chartRef} data={chartData} options={options} />
            <CustomLegend legendData={legendData} toggleDatasetVisibility={(index) => toggleDatasetVisibility(chartRef, index)} />
            </>
        ) : (
            <h1>Данные отсутствуют</h1> // Или любой другой элемент, который вы хотите показать при отсутствии данных
        )}
    </div>
    
)
});

export default BarChart;