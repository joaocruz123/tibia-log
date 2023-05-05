import { Button, DialogContentText, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../themes/dashboard/DashboardLayout";
import Title from "../../themes/dashboard/Title";
import { ContentButton } from "./styles";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomDialog from "../../components/CustomDialog";
import Content from "../../themes/Content";
import CustomBreadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import InfoView from "../../components/InfoView";
import api from "../../services/apiService";
import MuiAlert from '@mui/material/Alert';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import Vote from "../Vote/Vote";
import { getItemSession } from "../../services/sessionService";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={() => { }}>
        Inicio
    </Link>,
    <Typography key="2" color="primary" sx={{ fontSize: 14 }}>
        Tasks
    </Typography>,
];

const Poker = () => {
    const [rows, setRows] = useState(null);
    const [loading, setLoading] = useState(false);
    const [createDialog, setCreateDialog] = useState(false);
    const [voteDialog, setVoteDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    const [nameTask, setNameTask] = useState("");
    const [selectedVote, setSelectedVote] = useState(null);
    const sessionUser = getItemSession('username');

    useEffect(() => {
        fetchTasks();
    }, []);

    async function fetchTasks() {
        setLoading(true);
        api.get('/task').then(response => {
            if (response.data && response.data.length > 0) {
                setRows(response.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }).catch(e => console.warn(e));
    }

    const createNewTask = () => {
        const data = {
            title: nameTask,
        }
        setLoading(true);
        handleCloseCreateDialog();

        api.post('/task', data).then(response => {
            if (response.data) {
                NotificationManager.success('Task cadastrada com sucesso!', 'Sucesso');
                fetchTasks();
                setLoading(false);
                setNameTask("")
            } else {
                NotificationManager.error('Erro ao cadastrar task!', 'Erro');
                setLoading(false);
                setNameTask("")
            }
        }).catch(e => console.warn(e));
    };

    const handleOpenCreateDialog = () => {
        setCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setCreateDialog(false);
    };

    const handleOpenDeleteDialog = () => {
        setDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialog(false);
    };

    const handleDeleteTask = async () => {
        handleCloseDeleteDialog();
        await api.delete(`/task/${selectedTask.id}`).then((response) => {
            if (response.data) {
                NotificationManager.success('Task removida com sucesso!', 'Sucesso');
                fetchTasks();
            } else {
                NotificationManager.error('Erro ao remover task!', 'Erro');
            }
        })
    };

    const handleVote = async (vote) => {
        const data = { "user": sessionUser, "vote": vote }

        await api.post(`/votes`, data).then((response) => {
            if (response.data) {
                NotificationManager.success('Voto registrado com sucesso!', 'Sucesso');
                setSelectedVote(null);
                setVoteDialog(false);
            } else {
                NotificationManager.error('Erro ao votar na task!', 'Erro');
                setSelectedVote(null);
                setVoteDialog(false);
            }
        })
    };

    return (
        <>
            <NotificationContainer />
            <DashboardLayout>
                <Content active={loading}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper elevation={0} sx={{ padding: 5 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6} md={8} lg={8}>
                                        <Title>
                                            Tasks
                                            <InfoView
                                                placement="right"
                                                content={`Cada tarefa pode ser votada pelos usuários que acessão a aplicação. Selecionando uma tarefa é apresentado 
                                                uma lista de 6 opções (além da opção de finalizar a votação)`} />
                                        </Title>
                                        <Typography sx={{ fontSize: '13px', color: '#666666' }} gutterBottom>
                                            As tasks são tarefas criadas para gerenciar o trabalho da equipe em uma sprint.
                                        </Typography>
                                    </Grid>
                                    <ContentButton item xs={6} md={4} lg={4} onClick={() => {
                                        handleOpenCreateDialog();
                                    }}>
                                        <Button variant="contained" sx={{ color: '#fff', height: 40 }} startIcon={<AddIcon />}>Cadastar Tasks</Button>
                                    </ContentButton>
                                    {rows && rows.length > 0 ? <>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <TableContainer sx={{ paddingX: '1rem' }}>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                                                            <TableCell sx={{ fontWeight: "bold" }}>Título</TableCell>
                                                            <TableCell sx={{ fontWeight: "bold" }}>Tempo</TableCell>
                                                            <TableCell sx={{ fontWeight: "bold" }}></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rows && rows.length > 0 && rows.map((row) => (
                                                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                <TableCell component="td" scope="row">
                                                                    {row.id}
                                                                </TableCell>
                                                                <TableCell component="td" scope="row">{row.title}</TableCell>
                                                                <TableCell component="td" scope="row">{row.result ? row.result : "_"}</TableCell>
                                                                <TableCell component="td" scope="row" align="right">
                                                                    {!row.result ?
                                                                        <Button variant="outlined"
                                                                            onClick={() => {
                                                                                setSelectedTask(row);
                                                                                setVoteDialog(true)
                                                                            }}
                                                                            startIcon={<HowToVoteIcon />} sx={{ marginX: ".4rem" }}>
                                                                            Votar
                                                                        </Button> :
                                                                        <Tooltip title="Votação finalizada">
                                                                            <span>
                                                                                <Button variant="outlined" disabled
                                                                                    startIcon={<HowToVoteIcon />}
                                                                                    sx={{ marginX: ".4rem" }}>
                                                                                    Votar
                                                                                </Button>
                                                                            </span>
                                                                        </Tooltip>}
                                                                    <Button color="error" variant="contained"
                                                                        onClick={() => {
                                                                            setSelectedTask(row);
                                                                            handleOpenDeleteDialog();
                                                                        }}
                                                                        aria-label="delete role" startIcon={<DeleteIcon />}
                                                                        sx={{ marginX: ".4rem" }}>
                                                                        Apagar
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                    </> : <>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <Alert severity="info">Não há tasks cadastradoas nessa sessão! Adicione tasks clicando no botão de cadastro</Alert>
                                        </Grid>
                                    </>}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <CustomDialog
                        open={createDialog}
                        handleClickOpen={handleCloseCreateDialog}
                        handleClose={handleCloseCreateDialog}
                        title={`Nova Task`}
                        description={
                            <>
                                <DialogContentText>
                                    Informe os dados para criar uma nova task.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Nome do Task"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={nameTask}
                                    onChange={(e) => setNameTask(e.target.value)}
                                />
                            </>}
                        confirmButton={true}
                        cancelButton={true}
                        confirmButtonText="Salvar"
                        cancelButtonText="fechar"
                        handleContinue={{}}
                        handleCancel={handleCloseCreateDialog}
                        handleConfirm={createNewTask}
                        confirmButtonError={false}
                        fullWidth={true}
                        maxWidth={"md"}
                        dividers={true}
                        textAling="start"
                    />
                    <CustomDialog
                        open={deleteDialog}
                        handleClickOpen={handleOpenDeleteDialog}
                        handleClose={handleCloseDeleteDialog}
                        title={`Deletar Task`}
                        description={<>Tem certeza que deseja deletar <strong>{selectedTask.title}</strong>?</>}
                        confirmButton={true}
                        cancelButton={true}
                        confirmButtonText="Sim"
                        cancelButtonText="Não"
                        handleContinue={{}}
                        handleCancel={handleCloseDeleteDialog}
                        handleConfirm={handleDeleteTask}
                        confirmButtonError={true}
                        fullWidth={true}
                        maxWidth={"xs"}
                        dividers={true}
                        textAling="start"
                    />

                </Content>
                <Vote
                    voteDialog={voteDialog}
                    setVoteDialog={setVoteDialog}
                    selectedVote={selectedVote}
                    setSelectedVote={setSelectedVote}
                    handleVote={handleVote}
                    selectedTask={selectedTask}
                    fetchTasks={fetchTasks}
                />
            </DashboardLayout>
        </>
    );
};

export default Poker;
