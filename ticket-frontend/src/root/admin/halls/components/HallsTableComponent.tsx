
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { Delete, Visibility, Edit } from '@mui/icons-material';
import { HallListItemDto } from '../../../../modules/hall/hall-list-item-dto';

export interface HallsTableComponentProps {
    halls: HallListItemDto[];
    onViewAction: (provider: HallListItemDto) => void;
    onEditAction: (provider: HallListItemDto) => void;
    onDeleteAction: (provider: HallListItemDto) => void;
}



export default function HallsTableComponent(props: HallsTableComponentProps) {
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Όνομα',
            minWidth: 100,
            editable: true,
            flex: 1,
            sortable: true
        },
        {
            field: 'address',
            headerName: 'Διεύθυνση',
            minWidth: 100,
            editable: true,
            flex: 1,
            sortable: false
        },
        {
            field: 'phone',
            headerName: 'Τηλέφωνο',
            minWidth: 100,
            editable: true,
            flex: 1,
            sortable: false
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
                rows={props.halls}
                columns={columns}
                pagination={undefined}
                hideFooter={true}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.hallId}
            />
        </Box>
    )
}
