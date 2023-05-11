import { Alert, Box, Button, Grid, Link, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import DashboardLayout from "../../themes/dashboard/DashboardLayout";
import Title from "../../themes/dashboard/Title";
import { ContentButton } from "./styles";
import Content from "../../themes/Content";
import CustomBreadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ArticleIcon from '@mui/icons-material/Article';
import ReactJson from 'react-json-view'

const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={() => { }}>
        Home
    </Link>,
    <Typography key="2" color="primary" sx={{ fontSize: 14 }}>
        Log
    </Typography>,
];

const Log = () => {
    const [loading, setLoading] = useState(false);
    const [selectedLog, setSelectedLog] = useState("");
    const [code, setCode] = useState(null);

    function filterItems({ array, query }) {
        return array.filter(function (el) {
            return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
        })
    };

    const calculate = (array) => {
        let soma = 0;
        const damege = array.map((value) => {
            const key = value.substring(5);
            const numsStr = key.replace(/[^0-9]/g, '');
            if (numsStr) return parseInt(numsStr)
            else return 0;
        })

        for (var i = 0; i < damege.length; i++) {
            soma += damege[i];
        }
        return soma;
    };

    const mappedLostDataPerCreature = (array) => {
        const perCreature = array.map((value) => {
            const arr = value.split('by a ');
            const key = value.substring(5);
            const damegeByCriature = key.replace(/[^0-9]/g, '');

            return {
                "creature": arr[1].slice(0, -2),
                "damege": damegeByCriature ? parseInt(damegeByCriature) : 0
            }
        })

        return perCreature;
    };

    const mappedLootData = (array) => {
        const cleanArray = array.filter((value) => {
            const arr = value.split(': ');
            if (arr[1] && arr[1] !== "nothing.") return true;
            else return false;
        })
        const loot = cleanArray.map((value) => {
            const arr = value.split(': ');
            const key = value.substring(5);
            const lootItem = key.replace(/[^0-9]/g, '');

            return {
                "item": arr[1].replace("[0-9]", ""),
                "loot": lootItem ? parseInt(lootItem) : 1
            }
        })

        return loot;
    };

    const clearArrayLostPerCreature = (array) => {
        const list = {}
        const newList = array.reduce((soma, cur) => {
            let creature = cur.creature;
            let repeat = soma.find(elem => elem.creature === creature)
            if (repeat) repeat.damege += cur.damege;
            else soma.push(cur);
            return soma;
        }, []);


        newList.forEach((elem) => { list[elem.creature] = elem.damege });

        return list
    };

    const clearArrayLoot = (array) => {
        const list = {}
        const newList = array.reduce((soma, cur) => {
            let item = cur.item;
            let repeat = soma.find(elem => elem.item === item)
            if (repeat) repeat.loot += cur.loot;
            else soma.push(cur);
            return soma;
        }, []);


        newList.forEach((elem) => { list[elem.item] = elem.loot });

        return list
    };

    const handleOpenCreateDialog = () => {
        if (!selectedLog) {
            NotificationManager.error('Adicione um arquivo de log para realizar a leitura!', 'Erro');
            return;
        }
        var file = selectedLog;
        var reader = new FileReader();
        reader.onload = function (event) {
            const logs = event.target.result
            const arrayLogs = logs.split('\n');

            const filterLostData = filterItems({ array: arrayLogs, query: "You lose" });
            const damegeTake = calculate(filterLostData);
            const filterHealedData = filterItems({ array: arrayLogs, query: "You healed" });
            const damegeHealed = calculate(filterHealedData);
            const filterLostDataPerCreature = filterItems({ array: arrayLogs, query: "by a" });
            const filterPerCreature = mappedLostDataPerCreature(filterLostDataPerCreature);
            const arrayLostPerCreature = clearArrayLostPerCreature(filterPerCreature);
            const filterExperienceData = filterItems({ array: arrayLogs, query: "experience" });
            const experienceGained = calculate(filterExperienceData);
            const filterLootData = filterItems({ array: arrayLogs, query: "Loot" });
            const filterLoot = mappedLootData(filterLootData);
            const arrayLoot = clearArrayLoot(filterLoot);

            setCode({
                "hitpointsHealed": damegeHealed,
                "damageTaken": {
                    "total": damegeTake,
                    "byCreatureKind": arrayLostPerCreature || []
                },
                "experienceGained": experienceGained,
                "loot": arrayLoot
            })

        };

        reader.readAsText(file);
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
                                    <Grid item xs={6} md={8} lg={8} display={"flex"} flexDirection={"row"}>
                                        <Button
                                            variant="contained"
                                            component="label"
                                        >
                                            Upload File Log
                                            <input
                                                type="file"
                                                hidden
                                                onChange={(e) => {
                                                    setSelectedLog((e.target.files[0]))
                                                }}
                                            />
                                        </Button>
                                        {selectedLog && <>
                                            <Box sx={{ marginLeft: "20px" }}>{selectedLog && selectedLog.name}</Box>
                                        </>}

                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper elevation={0} sx={{ padding: 5 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6} md={8} lg={8}>
                                        <Title>Log</Title>
                                        <Typography sx={{ fontSize: '13px', color: '#666666' }} gutterBottom>
                                            In this log, a new line is created whenever the player executes some action, or is involved in some world action.
                                        </Typography>
                                    </Grid>
                                    <ContentButton item xs={6} md={4} lg={4} onClick={() => {
                                        handleOpenCreateDialog();
                                    }}>
                                        <Button variant="contained" sx={{ color: '#fff', height: 40 }} startIcon={<ArticleIcon />}>Read Log</Button>
                                    </ContentButton>
                                    <Grid item xs={12} md={12} lg={12} >
                                        {!code ? <>
                                            <Alert severity="info" color="info">
                                                Add log file to view result.
                                            </Alert>
                                        </> : <Box sx={{ background: '#E4E1EB', padding: "1rem", borderRadius: "10px" }}>
                                            <ReactJson src={code} />
                                        </Box>}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Content>
            </DashboardLayout>
        </>
    );
};

export default Log;
