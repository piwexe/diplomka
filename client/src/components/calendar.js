
import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import "./calendar.css"

const RangeCalendar = observer(() => {
    
  const [date, setDate] = useState(getTodayRange());
  const dateToSend = useMemo(() => date.map(dateObj => dateObj ? dateObj.toISOString() : null), [date]);
  const {user} = useContext(Context);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectChange = (event) => {
    setSelectedId(event.target.value);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem('token');
                const config = {
                headers: {
                 Authorization: `Bearer ${token}`
                }
                };
        const response = await axios.get(`http://localhost:4000/api/rawRoll/getAllEntries?start=${dateToSend[0]}&end=${dateToSend[1]}`, config);
        user.setrawData(response.data); // Предполагая, что ответ содержит массив опций
      } catch (error) {
        console.error('Error fetching select options:', error);
      }
    };
    // Выполнение запроса при монтировании
    fetchOptions();

  }, [dateToSend]); // Пустой массив зависимостей, чтобы запрос выполнялся один раз при монтировании

  console.log('Current options:', user.rawData); // Отследить текущие опции
    useEffect(() => {
        const fetchData = async () => {
            try {
              const token = localStorage.getItem('token');
                const config = {
                headers: {
                 Authorization: `Bearer ${token}`
                }
                };
                let url = `http://localhost:4000/api/namotka1/getAllEntries?start=${dateToSend[0]}&end=${dateToSend[1]}`;
                if (selectedId) {
                    url += `&selectedId=${selectedId}`;
                }
                const response = await axios.get(url, config);
                user.setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    const intervalId = setInterval(fetchData, 60000);
    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
    }, [dateToSend,selectedId]);
    
    useEffect(() => {
      const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
              const config = {
              headers: {
               Authorization: `Bearer ${token}`
              }
              };
              let url = `http://localhost:4000/api/namotka1/getGood?start=${dateToSend[0]}&end=${dateToSend[1]}`;
              if (selectedId) {
                  url += `&selectedId=${selectedId}`;
              }
              const response = await axios.get(url, config);
              user.setGoodData(response.data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  const intervalId = setInterval(fetchData, 60000);
  return () => clearInterval(intervalId);
  }, [dateToSend,selectedId]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
            const config = {
            headers: {
             Authorization: `Bearer ${token}`
            }
            };
            let url = `http://localhost:4000/api/namotka1/getBad?start=${dateToSend[0]}&end=${dateToSend[1]}`;
            if (selectedId) {
                url += `&selectedId=${selectedId}`;
            }
            const response = await axios.get(url, config);
            user.setBadData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
const intervalId = setInterval(fetchData, 60000);
return () => clearInterval(intervalId);
}, [dateToSend,selectedId]);

  return (
    <div className="calendar">
      <Flatpickr
        data-enable-time
        className="custom-flatpickr"
        value={date}
        onChange={([start, end]) => {
            setDate([start, end]);
          }}
        options={{
          mode: 'range',
          enableTime: true,
          dateFormat: 'Y-m-d H:i',
        }}
        placeholder="Select start date"
      />
      <select className="custom-select" onChange={handleSelectChange} value={user.selectedId}>
      <option value="">Все рулоны</option>
          {user.rawData.map((option, index) => (
             <option key={index} value={option.id}>{option.name}</option>
          ))}
      </select>
    </div>
    
  );
});

const getTodayRange = () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // Установить начало дня

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999); // Установить конец дня

  return [startOfDay, endOfDay];
};

export default RangeCalendar;