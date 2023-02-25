import { useEffect, useState } from 'react';
import './SeatsMapComponent.css';

export interface SeatsMapComponentProps {
    seatsRows: number;
    seatsColumns: number;
}


export default function SeatsMapComponent(props: SeatsMapComponentProps) {
    const [rowIds, setRowIds] = useState<number[]>([]);
    const [columnIds, setColumnIds] = useState<number[]>([]);

    useEffect(() => {
        setRowIds(Array.from(Array(props.seatsRows).keys()))
        setColumnIds(Array.from(Array(props.seatsColumns).keys()))
    }, [props.seatsRows, props.seatsColumns])
    return (
        <div>
            <table className='seatsTable'>
                <tbody>
                    {rowIds.map((rowId) => (
                        <tr key={rowId}>
                            {columnIds.map((columnId) => (
                                <td key={columnId}></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
