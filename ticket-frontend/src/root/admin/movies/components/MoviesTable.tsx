
import CardMedia from '@mui/material/CardMedia';
import { MovieDto } from '../../../../modules/movie/movie-dto';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { Delete, Visibility, Edit } from '@mui/icons-material';
import { MovieListItemDto } from '../../../../modules/movie/movie-list-item-dto';

export interface MoviesTableProps {
    movies: MovieListItemDto[];
    onViewAction: (movie: MovieDto) => void;
    onEditAction: (movie: MovieDto) => void;
    onDeleteAction: (movie: MovieDto) => void;
}



export default function MoviesTable(props: MoviesTableProps) {
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Τίτλος',
            minWidth: 100,
            editable: true,
            flex: 1,
            sortable: true
        },
        {
            field: 'description',
            headerName: 'Περίληψη',
            minWidth: 100,
            editable: true,
            flex: 1,
            sortable: false
        }, {
            field: 'image',
            headerName: 'Εικόνα',
            width: 60,
            editable: true,
            sortable: false,
            renderCell: (params) => (
                <CardMedia
                    component="img"
                    height="60"
                    src={params.row.imageMimePrefix + ',' + params.value}
                />
            ),
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
                rows={props.movies}
                columns={columns}
                pagination={undefined}
                hideFooter={true}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.movieId}
            />
        </Box>
    )
}
