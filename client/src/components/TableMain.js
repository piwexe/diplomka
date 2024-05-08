import React, { useContext } from 'react';
import style from './TableMain.module.css';
import { useTable } from 'react-table';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const TableMain = observer(() => {
    const {user} = useContext(Context);
    const data = React.useMemo(
        () => user.dataCalendar,
        [user.dataCalendar]
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Номер рулона',
                accessor: 'rawRollId'
            },
            {
                Header: 'Номер намотки',
                accessor: 'number'
            },
            {
                Header: 'Длина намотки',
                accessor: 'length'
            },
            {
                Header: 'Диаметр намотки',
                accessor: 'diameter'
            },
            {
                Header: 'Вес намотки',
                accessor: 'weight'
            },
            {
                Header: 'Время окончания намотки',
                accessor: 'time',
                Cell: ({ value }) => new Date(value).toLocaleString()
            },
            {
                Header: 'Годность',
                accessor: 'validity',
                Cell: ({ value }) => value ? 'Да' : 'Нет'
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    if (!data.length) {
        return <div className={style.texttt}>Данные отсутствуют</div>;
    }
    
        return (
            <div className={style.maintable}>
            <table {...getTableProps()} style={{ width: `100%`, borderCollapse: 'collapse' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray', borderTop: ' 1px solid gray', paddingBottom: '3px', background: 'aliceblue', color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} style={{ borderLeft: '1px solid gray', padding: '10px', borderRight: ' 1px solid gray', borderBottom: ' 1px solid gray', borderTop: ' 1px solid gray', textAlign: 'center' }}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className={style.bottomdiv}>Всего годных намоток:{user.goodData}</div>
            <div className={style.bottomdiv}>Всего негодных намоток:{user.badData}</div>
            </div>
          
        );
    
    
    
});

export default TableMain