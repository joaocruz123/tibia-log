import React, { useState } from 'react';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PropTypes from 'prop-types';
import api from '../../services/apiService';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CardPoker = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#c7c7c7',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#696969',
    fontSize: 100,
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',

    '&.selected': {
        border: '5px solid #00c5cc',
        marginTop: 40
    }
}));

const CardPokerMini = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#c7c7c7',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#696969',
    fontSize: 14,
    height: '70px',
    width: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 40,
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function Vote(props) {
    const { voteDialog, selectedTask, setVoteDialog, selectedVote, setSelectedVote, handleVote, fetchTasks } = props;
    const [finishDialog, setFinishDialog] = useState(false);
    const [votes, setVotes] = useState([]);

    function getVotesPerItem() {
        api.get('/votes').then((response) => {
            if (response && response.data) {
                setVotes(response.data)
            }
        }).catch((e) => console.error(e));
    };

    function filterVotes({ votes, value }) {
        const filter = votes.filter((item) => item.vote === value);
        const length = (filter && filter.length) || 0

        return length
    };

    function calculatePorcentage(value) {
        const total = value;
        const porcente = total * 100 / votes.length

        return `${Math.round(porcente)}%`

    };

    function handleFinishVote() {
        const higherVote = votes.reduce(function (prev, current) {
            return (prev.vote > current.vote) ? prev : current
        })

        const data = { "result": higherVote ? higherVote.vote : 0 };

        api.patch(`/task/${selectedTask.id}`, data).then((response) => {
            if (response && response.data) {
                setFinishDialog(false);
                setVoteDialog(false);
                votes.forEach((vote) => { api.delete(`/votes/${vote.id}`) });
                fetchTasks();
            }
        }).catch((e) => console.error(e));
    };

    return (
        <Dialog
            fullScreen
            open={voteDialog}
            onClose={() => setVoteDialog(false)}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setVoteDialog(false)}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {selectedTask.title}
                    </Typography>

                    <Button variant="contained" color="secondary"
                        onClick={() => handleVote(selectedVote)}
                        startIcon={<HowToVoteIcon />} sx={{ marginX: ".4rem" }}>
                        Votar
                    </Button>
                    <Button color="success" onClick={() => {
                        getVotesPerItem();
                        setFinishDialog(true)
                    }} variant="contained" startIcon={<AssignmentTurnedInIcon />} sx={{ marginX: ".4rem" }}>
                        Finalizar
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ padding: 4 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ marginBottom: 3 }}>
                    Ao finalizar a votação o processo de estimativas se encerra, não sendo possivel iniciar nova votação da mesma task.
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={2}>
                        <CardPoker className={selectedVote === 0.5 ? 'selected' : ''} onClick={() => setSelectedVote(0.5)}>0.5</CardPoker>
                    </Grid>
                    <Grid item xs={12} md={4} lg={2}>
                        <CardPoker className={selectedVote === 1 ? 'selected' : ''} onClick={() => setSelectedVote(1)}>1</CardPoker>
                    </Grid>
                    <Grid item xs={12} md={4} lg={2}>
                        <CardPoker className={selectedVote === 2 ? 'selected' : ''} onClick={() => setSelectedVote(2)}>2</CardPoker>
                    </Grid>
                    <Grid item xs={12} md={4} lg={2}>
                        <CardPoker className={selectedVote === 3 ? 'selected' : ''} onClick={() => setSelectedVote(3)}>3</CardPoker>
                    </Grid>
                    <Grid item xs={12} md={4} lg={2}>
                        <CardPoker className={selectedVote === 5 ? 'selected' : ''} onClick={() => setSelectedVote(5)}>5</CardPoker>
                    </Grid>
                    <Grid item xs={12} md={4} lg={2}>
                        <CardPoker className={selectedVote === 8 ? 'selected' : ''} onClick={() => setSelectedVote(8)}>8</CardPoker>
                    </Grid>
                </Grid>
            </Box>
            <BootstrapDialog
                disableEscapeKeyDown={true}
                onClose={false}
                aria-labelledby="customized-dialog-title"
                open={finishDialog}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={false}>
                    Resultado da votação
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} lg={12} display={'flex'}>
                            <CardPokerMini>0.5</CardPokerMini>
                            <Typography variant="h6" gutterBottom sx={{ lineHeight: 3 }}>
                                Votos: {filterVotes({ votes, value: 0.5 })} - ({calculatePorcentage(filterVotes({ votes, value: 0.5 }))})
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} lg={12} display={'flex'}>
                            <CardPokerMini>1</CardPokerMini>
                            <Typography variant="h6" gutterBottom sx={{ lineHeight: 3 }}>
                                Votos: {filterVotes({ votes, value: 1 })} - ({calculatePorcentage(filterVotes({ votes, value: 1 }))})
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} lg={12} display={'flex'}>
                            <CardPokerMini>2</CardPokerMini>
                            <Typography variant="h6" gutterBottom sx={{ lineHeight: 3 }}>
                                Votos: {filterVotes({ votes, value: 2 })} - ({calculatePorcentage(filterVotes({ votes, value: 2 }))})
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} lg={12} display={'flex'}>
                            <CardPokerMini>3</CardPokerMini>
                            <Typography variant="h6" gutterBottom sx={{ lineHeight: 3 }}>
                                Votos: {filterVotes({ votes, value: 3 })} - ({calculatePorcentage(filterVotes({ votes, value: 3 }))})
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} lg={12} display={'flex'}>
                            <CardPokerMini>5</CardPokerMini>
                            <Typography variant="h6" gutterBottom sx={{ lineHeight: 3 }}>
                                Votos: {filterVotes({ votes, value: 5 })} - ({calculatePorcentage(filterVotes({ votes, value: 5 }))})
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} lg={12} display={'flex'}>
                            <CardPokerMini>8</CardPokerMini>
                            <Typography variant="h6" gutterBottom sx={{ lineHeight: 3 }}>
                                Votos: {filterVotes({ votes, value: 8 })} - ({calculatePorcentage(filterVotes({ votes, value: 8 }))})
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleFinishVote()}>
                        Salvar e voltar a lista de tasks
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Dialog>
    )
}
