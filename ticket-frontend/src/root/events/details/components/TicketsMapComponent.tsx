import { Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import './TicketsMapComponent.css';
import { TicketDto } from '../../../../modules/ticket/dtos/ticket-dto';

export interface TicketsMapComponentProps {
    tickets: TicketDto[];
    onSelectedTicketsChange: (selectedTickets: Record<number, TicketDto>) => void
}


export default function TicketsMapComponent(props: TicketsMapComponentProps) {
    const [ticketsTableData, setTicketsTableData] = useState<[TicketDto[]]>([[]]);
    const [selectedTickets, setSelectedTickets] = useState<Record<number, TicketDto>>({});

    useEffect(() => {
        const ticketsTableData: [TicketDto[]] = [[]];

        for (const ticket of props.tickets) {
            if (ticketsTableData[ticket.seatRow] == null) {
                ticketsTableData[ticket.seatRow] = []
            }
            ticketsTableData[ticket.seatRow][ticket.seatColumn] = ticket;
        }

        setTicketsTableData(ticketsTableData);
    }, [])

    function onTicketSelect(ticket: TicketDto) {
        console.log('ticket', ticket)
        if (ticket.ticketId != null && ticket.userRef == null) {
            if (selectedTickets[ticket.ticketId]) {
                delete selectedTickets[ticket.ticketId];
            } else {
                selectedTickets[ticket.ticketId] = ticket;
            }
            setSelectedTickets({ ...selectedTickets });
            props.onSelectedTicketsChange(selectedTickets)
        }
    }

    return (
        <Card>
            <CardContent sx={{ justifyItems: "center", justifyContent: "center", textAlign: "center", overflow: 'auto' }}>
                <h4>
                    Επιλογή Εισιτηρίων
                </h4>
                <table className='event-tickets-table' style={{ justifySelf: "center", justifyItems: "center" }}>
                    <tbody>
                        {ticketsTableData.map((ticketsRow, index) => (
                            <tr key={index}>
                                {ticketsRow.map((ticket) => (
                                    <td key={ticket.ticketId}
                                        className={`${ticket.userRef != null ? "taken" : ""} ${(ticket.ticketId != null && selectedTickets[ticket.ticketId]) ? "selected" : ""}`}
                                        onClick={() => onTicketSelect(ticket)}>
                                        {`${ticket.seatRow}-${ticket.seatColumn}`}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>

    )
}
