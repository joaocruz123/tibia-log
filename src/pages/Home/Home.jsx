import React, { useState } from "react";
import { DialogContentText, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import DashboardLayout from "../../themes/dashboard/DashboardLayout";
import Content from "../../themes/Content";
import ImgHome from "../../assets/3255469.png";
import CustomDialog from "../../components/CustomDialog";
import { useEffect } from "react";
import { getItemSession, setItemSession } from "../../services/sessionService";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Desenvolvido por '}
            <Link color="inherit" href="https://github.com/joaocruz123">
                João Cruz
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [userNameDialog, setUserNameDialog] = useState(false);
    const sessionUser = getItemSession('username') || null;
    const [username, setUserName] = useState("");

    useEffect(() => {
        if (!sessionUser) {
            setUserNameDialog(true);
        } else {
            setUserName(sessionUser);
        }
    }, [username, sessionUser])

    const handleUserNameSession = () => {
        setUserNameDialog(false);
        setItemSession({ key: 'username', value: username });
        setLoading(false);
    };

    return (
        <>
            <DashboardLayout>
                <Content active={loading}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12}>
                            <Paper elevation={0} sx={{
                                height: '100%',
                                overflow: 'hidden',
                                position: 'relative',
                                background: '#ffeee5',
                                borderRadius: '16px',
                                padding: '1rem 2rem',
                            }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={7} md={7}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Typography component="h2" variant="h5"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: '#383838'
                                            }}
                                        >
                                            Bem-vindo ao Planning Poker!
                                        </Typography>
                                        <Typography component="h2" variant="body1"
                                            sx={{
                                                color: '#7a7a7a',
                                                margin: '1rem 0',
                                                fontSize: '16px'
                                            }}
                                        >
                                            Navegue até o menu lateral para ter acesso ao controle de
                                            tasks, e iniciar o planning poker.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={5} md={5}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img src={ImgHome} alt={'img home'} width={200} height={200} />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ pt: 4, position: 'absolute', bottom: '20px', left: '45%' }} />
                </Content>
            </DashboardLayout>
            <CustomDialog
                open={userNameDialog}
                disableEscapeKeyDown={true}
                onClose={false}
                handleClose={() => setUserNameDialog(false)}
                title={`Qual o seu nome?`}
                description={
                    <>
                        <DialogContentText>
                            Informe seu nome para que os seus registros sejam gerenciados pela aplicação.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nome do usuário"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </>}
                confirmButton={true}
                cancelButton={false}
                confirmButtonText="Salvar"
                cancelButtonText="fechar"
                handleContinue={{}}
                handleCancel={() => setUserNameDialog(false)}
                handleConfirm={() => handleUserNameSession()}
                confirmButtonError={false}
                fullWidth={true}
                maxWidth={"xs"}
            />
        </>

    );
}

export default Home;

