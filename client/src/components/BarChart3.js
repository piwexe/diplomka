import React, { useState, useContext, useEffect, useRef} from 'react';
import { Bar } from "react-chartjs-2";
import style from './BarChart.module.css';
import { Chart as ChartJS } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const BarChart3 = observer(() => {
    const chartRef = useRef(null);  // Создаем ссылку на график
    const { user } = useContext(Context);
    const [chartData, setChartData] = useState({ datasets: [] });
    const [options, setOptions] = useState({});
    const [legendData, setLegendData] = useState([]);

    const getColorByRawRollId = (rawRollIds) => {
        const colors = {
            1: 'rgba(54, 162, 235)', 
            2: 'rgba(255, 99, 132)', 
            3: 'rgba(75, 192, 192)',  
            4: 'rgba(255, 159, 64)',
            5: 'rgba(153, 102, 255)',
        };
        return rawRollIds.map(item => {
            return {
                color: colors[item.y[0]] || 'rgba(63, 210, 255)', // Default color if no match
                label: user.rawData.find(data => data.id === item.y[0])?.name || 'Неизвестный' // Default name if no data found
            };
        });
    };

    const getLegendData = (rawRollIds) => {
        const colorMap = new Map();
        rawRollIds.forEach(item => {
            const colorKey = item.y[0]; // Получаем rawRollId
            if (!colorMap.has(colorKey)) {
                const color = getColorByRawRollId([item])[0].color;
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
        if (user.dataCalendar && user.dataCalendar.length > 0) {
            let minTime = user.dateRange[0];
            let maxTime = user.dateRange[1];

            const aggregatedData = aggregateDataByTimeInterval(user.dataCalendar);
            setChartData({
                labels: aggregatedData.labels,
                datasets: [{
                    label: "Количество намоток",
                    data: aggregatedData.datasetData,
                    backgroundColor: getColorByRawRollId(aggregatedData.rawRollIds).map(item => item.color),
                    categoryPercentage: 1,
                    barPercentage: 1,
                }],
            });

            
            // Настройки осей и других параметров графика
            setOptions({
                responsive: true,
                animation: {
                    duration: 500,
                    easing: 'easeInOutQuart'
                },
                scales: {
                    x: {
                        type: 'time',
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
                            autoSkip: true,
                            stepSize: 10,
                        },
                        min: minTime,
                        max: maxTime,
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
                        },
                        max: aggregatedData.maxValue * 1.5, // Удвоенное максимальное значение для оси Y
                        grid: {
                            drawTicks: true,
                            tickLength: 5,
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        backgroundColor: 'rgba(0,0,0,0.7)', // фон всплывающей подсказки
                        titleFont: {                        // стили для заголовка всплывающей подсказки
                            size: 16,
                            weight: 'bold',
                        },
                        bodyFont: {                         // стили для основного текста всплывающей подсказки
                            size: 14
                        }
                    }
                },
            });
            const newLegendData = getLegendData(aggregatedData.rawRollIds);
            setLegendData(newLegendData);  // Установка нового состояния для legendData
        } else {
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
                <h1>Данные отсутствуют</h1>
            )}
        </div>
    );
});

export default BarChart3;

function aggregateDataByTimeInterval(dataCalendar) {
    const aggregatedDataMap = new Map();

    dataCalendar.forEach(item => {
        const timestamp = new Date(item.time);
        // Ограничиваем интересующий нас временной диапазон
        if (timestamp.getHours() >= 8 && timestamp.getHours() < 18) {
            const roundedTimestamp = new Date(timestamp);
            roundedTimestamp.setMinutes(Math.floor(timestamp.getMinutes() / 10) * 10, 0, 0); // Округление до ближайших 10 минут
            const key = roundedTimestamp.toISOString();

            // Создаем запись в map, если ее нет
            if (!aggregatedDataMap.has(key)) {
                aggregatedDataMap.set(key, {
                    count: 0,
                    rawRollIds: []
                });
            }
            // Обновляем счетчик и добавляем rawRollId в массив
            const data = aggregatedDataMap.get(key);
            data.count++;
            if (!data.rawRollIds.includes(item.rawRollId)) {
                data.rawRollIds.push(item.rawRollId);
            }
            aggregatedDataMap.set(key, data);
        }
    });

    console.log("Aggregated data:", Array.from(aggregatedDataMap));
    // Сортируем ключи для сохранения порядка времени
    const sortedKeys = Array.from(aggregatedDataMap.keys()).sort();
    const datasetData = sortedKeys.map(key => ({
        x: key,
        y: aggregatedDataMap.get(key).count
    }));
    const rawRollIds = sortedKeys.map(key => ({
        x: key,
        y: aggregatedDataMap.get(key).rawRollIds
    }));
    const labels = sortedKeys; // Используем отсортированные ключи как метки

    const maxValue = Math.max(...datasetData.map(data => data.y));

    return { labels, datasetData, maxValue, rawRollIds };
}


