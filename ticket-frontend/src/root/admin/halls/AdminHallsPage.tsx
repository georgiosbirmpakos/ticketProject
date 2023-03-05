import { Box, Button, Grid } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import HallsTableComponent from './components/HallsTableComponent';
import { Add } from '@mui/icons-material';
import { AdminHallsService } from './admin-halls-service';
import { useSnackbar } from 'notistack';
import { HallListItemDto } from '../../../modules/hall/hall-list-item-dto';
import HallDialogCreateComponent from './components/HallDialogCreateComponent';
import HallDialogUpdateComponent from './components/HallDialogUpdateComponent';
import HallDialogDeleteComponent from './components/HallDialogDeleteComponent';

export default function AdminHallsPage() {
    const [halls, setHalls] = useState<HallListItemDto[]>([]);
    const [isDialogCreateOpen, setIsDialogCreateOpen] = useState<boolean>(false);
    const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState<boolean>(false);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState<boolean>(false);
    const [selectedHall, setSelectedHall] = useState<HallListItemDto | null>(null);
    const [readonly, setReadonly] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        loadData();
    }, [])

    async function loadData() {
        setHalls([]);
        try {
            const fetchHallsListResponseDto = await AdminHallsService.fetchHallsList();
            setHalls(fetchHallsListResponseDto.halls);
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Αποτυχημένη εύρεση λίστας αιθουσών', { variant: 'error' })
        }
    }


    function createHallClicked() {
        setSelectedHall(null);
        setIsDialogCreateOpen(true);
    }

    function viewProviderClicked(selectedHall: HallListItemDto) {
        setSelectedHall(selectedHall);
        setReadonly(true);
        setIsDialogUpdateOpen(true);
    }

    function updateProviderClicked(selectedHall: HallListItemDto) {
        setSelectedHall(selectedHall);
        setReadonly(false);
        setIsDialogUpdateOpen(true);
    }

    function deleteProviderClicked(selectedHall: HallListItemDto) {
        setSelectedHall(selectedHall);
        setIsDialogDeleteOpen(true);
    }

    async function afterAdd() {
        setIsDialogCreateOpen(false);
        await loadData();
    }

    async function afterUpdate() {
        setIsDialogUpdateOpen(false);
        await loadData();
    }


    async function afterDelete() {
        setIsDialogDeleteOpen(false);
        await loadData();
    }

    return (
        <Fragment>
            <Box style={{ width: '100%', height: '100%' }}>
                <Grid container direction="row" padding={2}
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid item>
                    </Grid>
                    <Grid item>
                        <Button onClick={createHallClicked} variant="contained" startIcon={<Add />}>
                            ΔΗΜΙΟΥΡΓΙΑ ΑΙΘΟΥΣΑΣ
                        </Button>
                    </Grid>
                </Grid>

                <HallsTableComponent halls={halls}
                    onViewAction={(hall) => viewProviderClicked(hall)}
                    onEditAction={(hall) => updateProviderClicked(hall)}
                    onDeleteAction={(hall) => deleteProviderClicked(hall)} />

            </Box>
            {isDialogCreateOpen && (
                <HallDialogCreateComponent open={isDialogCreateOpen}
                    onCancel={() => setIsDialogCreateOpen(false)}
                    afterAdd={afterAdd} />
            )}
            {isDialogUpdateOpen && selectedHall && (
                <HallDialogUpdateComponent open={isDialogUpdateOpen}
                    readonly={readonly}
                    hallId={selectedHall.hallId}
                    onCancel={() => setIsDialogUpdateOpen(false)}
                    afterUpdate={afterUpdate} />
            )}
            {isDialogDeleteOpen && selectedHall && (
                <HallDialogDeleteComponent open={isDialogDeleteOpen}
                    onCancel={() => setIsDialogDeleteOpen(false)}
                    afterDelete={afterDelete} hall={selectedHall} />
            )}
        </Fragment>
    );
}
