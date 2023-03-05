
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { Delete, Visibility, Edit } from '@mui/icons-material';
import { ProviderListItemDto } from '../../../../modules/provider/provider-list-item-dto';

export interface ProvidersTableComponentProps {
    providers: ProviderListItemDto[];
    onViewAction: (provider: ProviderListItemDto) => void;
    onEditAction: (provider: ProviderListItemDto) => void;
    onDeleteAction: (provider: ProviderListItemDto) => void;
}



export default function ProvidersTableComponent(props: ProvidersTableComponentProps) {
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Όνομα',
            minWidth: 100,
            editable: false,
            flex: 1,
            sortable: true
        },
        {
            field: 'address',
            headerName: 'Διεύθυνση',
            minWidth: 100,
            editable: false,
            flex: 1,
            sortable: true
        },
        {
            field: 'phone',
            headerName: 'Τηλέφωνο',
            minWidth: 100,
            editable: false,
            flex: 1,
            sortable: true
        },
        {
            field: 'description',
            headerName: 'Περιγραφή',
            minWidth: 100,
            editable: false,
            flex: 1,
            sortable: false
        },
        {
            field: 'actions',
            headerName: 'Ενέργειες',
            width: 150,
            editable: false,
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
                rows={props.providers}
                columns={columns}
                pagination={true}
                hideFooter={false}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.providerId}
            />
        </Box>
    )
}
