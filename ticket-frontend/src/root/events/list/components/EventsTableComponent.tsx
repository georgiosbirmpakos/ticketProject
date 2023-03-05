
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { LabelValue } from '../../../../modules/core/label-value';
import { EventDto } from '../../../../modules/event/dtos/event-dto';
import { Link } from 'react-router-dom';
import React from 'react';

export interface EventsTableComponentProps {
    events: EventDto[];
}



export default function EventsTableComponent(props: EventsTableComponentProps) {
    const columns: GridColDef[] = [
        {
            field: 'movieRef',
            headerName: 'Ταινία',
            minWidth: 150,
            editable: false,
            flex: 1,
            sortable: false,
            // valueGetter: (params: GridValueGetterParams<MovieListItemDto>) => params.value ? params.value.name : '',
            renderCell: (params) => (
                <React.Fragment>
                    <img height={60} width={60} src={params.value.imageMimePrefix + ',' + params.value.image} alt="movie" ></img>

                    <p>{params.value.name}</p>
                </React.Fragment>
            ),
        },
        {
            field: 'hallRef',
            headerName: 'Αίθουσα',
            minWidth: 100,
            editable: false,
            flex: 1,
            sortable: false,
            valueGetter: (params: GridValueGetterParams<LabelValue<number>>) => params.value ? params.value.label : '',
        },
        {
            field: 'eventDatetime',
            headerName: 'Ημερομηνία',
            minWidth: 100,
            editable: false,
            flex: 1,
            sortable: true,
        },
        {
            field: 'eventPrice',
            headerName: 'Τιμή Εισιτηρίου',
            minWidth: 50,
            editable: false,
            flex: 1,
            sortable: false
        },
        {
            field: 'actions',
            headerName: 'Εισιτήρια',
            width: 150,
            editable: false,
            sortable: false,
            renderCell: (params) => (
                <Button component={Link} to={'/events/details?eventId=' + params.row.eventId} variant='outlined' sx={{ ":hover": { borderColor: '#920b17', color: '#920b17' }, color: '#E63946', backgroundColor: 'white', borderColor: '#E63946', borderRadius: 20, marginLeft: 1 }} size="small">ΕΙΣΙΤΗΡΙΑ</Button>
            ),
        }
    ];


    return (
        <Box sx={{ height: '500px', padding: 2 }}>
            <DataGrid
                rows={props.events}
                columns={columns}
                pagination={true}
                hideFooter={false}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.eventId}
            />
        </Box>
    )
}
