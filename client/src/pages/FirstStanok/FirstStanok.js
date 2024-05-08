import React, { useEffect, useState } from 'react';
import '../../styles/FirstStanok.css';
import NavBar from '../../components/NavBar';
import BarChart from '../../components/BarChart';
import BarChart2 from '../../components/BarChart2';
import BarChart3 from '../../components/BarChart3';
import BarChart4 from '../../components/BarChart4';
import TableMain from '../../components/TableMain';
import RangeCalendar from '../../components/calendar';

const FirstStanok = () => {
    
    useEffect(() => {
        document.body.style.backgroundColor = 'white'; // Задаем цвет фона для FirstStanok
        return () => {
            document.body.style.backgroundColor = null; // Сбрасываем цвет при размонтировании компонента
        };
    }, []);

    const [activeChart, setActiveChart] = useState('mainTable');

    return (
        <div>
            <NavBar onChartSelect={setActiveChart} />
            <RangeCalendar />
            {activeChart === 'chart1' && <BarChart/>}
            {activeChart === 'chart2' && <BarChart2/>}
            {activeChart === 'chart3' && <BarChart3/>}
            {activeChart === 'chart4' && <BarChart4/>}
            {activeChart === 'mainTable' && <TableMain/>}
        </div>
    )
}

export default FirstStanok;