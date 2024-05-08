import React, { useState } from "react";
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const NavBar = ({ onChartSelect }) => {

    const [nav1, setNav1] = useState(false);
    const [nav2, setNav2] = useState(true);
    const [nav3, setNav3] = useState(true);
    const [nav4, setNav4] = useState(true);
    const [nav5, setNav5] = useState(true);

    const [navmenu, setNavMenu] = useState(false);

    const toggleNav1 = () => {
        setNav1(false);
        setNav2(true);
        setNav3(true);
        setNav4(true);
        setNav5(true);
        setNavMenu(false);
        onChartSelect('mainTable');
    };
    const toggleNav2 = () => {
        setNav1(true);
        setNav2(false);
        setNav3(true);
        setNav4(true);
        setNav5(true);
        setNavMenu(false);
        onChartSelect('chart1');
    };
    const toggleNav3 = () => {
        setNav1(true);
        setNav2(true);
        setNav3(false);
        setNav4(true);
        setNav5(true);
        setNavMenu(false);
        onChartSelect('chart2');
    };
    const toggleNav4 = () => {
        setNav1(true);
        setNav2(true);
        setNav3(true);
        setNav4(false);
        setNav5(true);
        setNavMenu(false);
        onChartSelect('chart3');
    };
    const toggleNav5 = () => {
        setNav1(true);
        setNav2(true);
        setNav3(true);
        setNav4(true);
        setNav5(false);
        setNavMenu(false);
        onChartSelect('chart4');
    };

    return (
        <header className={style.stanokheader}>
            <div className={style.stanokcontainer}>
                <div className={style.box}>
                    <div onClick={() => setNavMenu(!navmenu)} className={style.mobile_btn}>
                        {navmenu ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
                    </div>
                    <ul className={navmenu ? [style.menu, style.active].join(' ') : [style.menu]}>
                        <li>
                            <Link to="/">
                                <button className={style.btnnav}>Все станки</button>
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => toggleNav1()} className={nav1 ? [style.btnnav] : [style.btnnav2]} >Таблица <br/>Намоток</button>
                        </li>
                        <li>
                            <button onClick={() => toggleNav2()} className={nav2 ? [style.btnnav] : [style.btnnav2]} >График <br/>Длины намоток</button>
                        </li>
                        <li>
                            <button onClick={() => toggleNav3()} className={nav3 ? [style.btnnav] : [style.btnnav2]} >График <br/>Диаметра намоток</button>
                        </li>
                        <li>
                            <button onClick={() => toggleNav5()} className={nav5 ? [style.btnnav] : [style.btnnav2]} >График <br/>Остаточного веса намоток</button>
                        </li>
                        <li>
                            <button onClick={() => toggleNav4()} className={nav4 ? [style.btnnav] : [style.btnnav2]} >График <br/>Производительности намоток</button>
                        </li>
                    </ul>
                    <div className={style.texttop}>Станок 1</div>
                </div>
            </div>
        </header>
    )
}

export default NavBar;