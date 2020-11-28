import AddVtuber from "../components/AddVtuber"
import { Button, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

import useSWR, { mutate, trigger } from "swr";
import axios from "axios";


const Home = () => {


    const classes = useStyles();


    const { data } = useSWR('/persons', {
        initialData: [{ name: 'name', details: 'about', id: -1 }]
    });


    return (
        <div>
            <Box marginBottom={2}>
                <AddVtuber />
            </Box>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    {/*ヘッダ */}
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="left">name</TableCell>
                            <TableCell align="left">details</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    {/*ボディ */}
                    <TableBody>
                        {data?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.details}</TableCell>

                                <TableCell align="left">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={async () => {

                                            const deleteUrl = '/persons/' + row.id;
                                            const url = '/persons';

                                            //mutateで画面を書き換える（削除予定のidを除いたデータにフィルタリング）
                                            mutate(url, data.filter(c => c.id !== row.id), false);

                                            //delete メソッドを投げる
                                            await axios.delete(deleteUrl);

                                            //triggerでswr起動
                                            trigger(url);

                                        }}
                                    >
                                        delete
                               </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}

export default Home