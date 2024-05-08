import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import first from '../assets/images/first.jpeg';
import second from '../assets/images/second.jpeg';
import third from '../assets/images/third.jpeg'

const HomePage = () => {
  return (
    <div className="container">
      <div className="el">
        <p className="bruh-p">Станок 1</p>
        <img src={first} className="img" alt="" />
        <ul className='ul-bruh'>
          <li>Скорость намотки: 250 м/мин</li>
          <li>Производительность: 10000 кг/сутки</li>
          <li>Потребляемая мощность при макс нагрузке: 100 кВт/час</li>
        </ul>
        <Link to="/first"><button className="btn-bruh">Выбрать</button></Link>
      </div>
      <div className="el">
        <p className="bruh-p">Станок 2</p>
        <img src={second} className="img" alt="" />
        <ul className='ul-bruh'>
          <li>Скорость намотки: 200 м/мин</li>
          <li>Производительность: 7500 кг/сутки</li>
          <li>Потребляемая мощность при макс нагрузке: 75 кВт/час</li>
        </ul>
        <button className="btn-bruh">Выбрать</button>
      </div>
      <div className="el">
        <p className="bruh-p">Станок 3</p>
        <img src={third} className="img" alt="" />
        <ul className='ul-bruh'>
          <li>Скорость намотки: 150 м/мин</li>
          <li>Производительность: 6000 кг/сутки</li>
          <li>Потребляемая мощность при макс нагрузке: 50 кВт/час</li>
        </ul>
        <button className="btn-bruh">Выбрать</button>
      </div>
    </div>
  )
}

export default HomePage;