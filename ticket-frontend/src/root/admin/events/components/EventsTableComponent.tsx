
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { Delete, Visibility, Edit } from '@mui/icons-material';
import { LabelValue } from '../../../../modules/core/label-value';
import { EventDto } from '../../../../modules/event/dtos/event-dto';

export interface EventsTableComponentProps {
    events: EventDto[];
    onViewAction: (provider: EventDto) => void;
    onEditAction: (provider: EventDto) => void;
    onDeleteAction: (provider: EventDto) => void;
}



export default function EventsTableComponent(props: EventsTableComponentProps) {
    const columns: GridColDef[] = [
        {
            field: 'movieRef',
            headerName: 'Ταινία',
            minWidth: 100,
            editable: true,
            flex: 1,
            sortable: false,
            valueGetter: (params: GridValueGetterParams<LabelValue<number>>) => params.value ? params.value.label : '',
        },
        {
            field: 'hallRef',
            headerName: 'Αίθουσα',
            minWidth: 100,
            editable: true,
            flex: 1,
            sortable: false,
            valueGetter: (params: GridValueGetterParams<LabelValue<number>>) => params.value ? params.value.label : '',
        },
        {
            field: 'name',
            headerName: 'Όνομα',
            minWidth: 100,
            editable: true,
            flex: 1,
            sortable: true
        },
        {
            field: 'eventDatetime',
            headerName: 'Ημερομηνία',
            minWidth: 100,
            editable: true,
            flex: 1,
            sortable: false,
        },
        {
            field: 'description',
            headerName: 'Περιγραφή',
            minWidth: 100,
            editable: true,
            flex: 1,
            sortable: false
        },
        {
            field: 'eventPrice',
            headerName: 'Τιμή Εισιτηρίου',
            minWidth: 100,
            editable: true,
            flex: 1,
            sortable: false
        },
        {
            field: 'actions',
            headerName: 'Ενέργειες',
            width: 150,
            editable: true,
            sortable: false,
            renderCell: (params) => (
                <Stack direction="row">
                    <Tooltip title="Εμφάνιση">
                        <IconButton onClick={() => props.onViewAction(params.row)}>
                            <Visibility />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Επεξεργασία">
                        <IconButton onClick={() => props.onEditAction(params.row)}>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Διαγραφή">
                        <IconButton onClick={() => props.onDeleteAction(params.row)}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        }
    ];


    return (
        <Box sx={{ height: '500px', padding: 2 }}>
            <DataGrid
                rows={props.events}
                columns={columns}
                pagination={undefined}
                hideFooter={true}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.eventId}
            />
        </Box>
    )
}
