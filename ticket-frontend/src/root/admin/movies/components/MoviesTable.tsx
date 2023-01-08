
import CardMedia from '@mui/material/CardMedia';
import { MovieModel } from '../../../shared/models/movie-model';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { Delete, Visibility, Edit } from '@mui/icons-material';

export interface MoviesTableProps {
  movies: MovieModel[];
  onViewAction: (movie: MovieModel) => void;
  onEditAction: (movie: MovieModel) => void;
  onDeleteAction: (movie: MovieModel) => void;
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
          src={"data:image;base64," + params.value}
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
