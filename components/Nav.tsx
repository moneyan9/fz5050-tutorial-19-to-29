import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));


const Nav = () => {

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" className={classes.title}>
                    App Bar
       </Typography>

                <Button color="inherit">
                    <Link href="/home">
                        <a style={{ color: 'white' }}>
                            <Typography color="inherit">
                                Home
             </Typography>
                        </a>
                    </Link>
                </Button>

                <Button color="inherit">
                    <Link href="/addvtuber">
                        <a style={{ color: 'white' }}>
                            <Typography color="inherit">
                                addvtuber
             </Typography>
                        </a>
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Nav