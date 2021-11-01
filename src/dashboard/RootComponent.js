import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import {logout} from "../data-service/LoginDataService";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Home from "../components/Home";
import Copyright from "./Copyright";
import Incidents from "../incident/Incidents";
import Profile from "../profile/Profile";
import HomeIcon from '@material-ui/icons/Home';
import useStyles from "./DashBoardStyles";
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import Stations from "../stations/Stations";
import Rails from "../rails/Rails";
import RailwayAlertIcon from '@mui/icons-material/RailwayAlert';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function RootComponent({logged}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onLogout = () => {
        logout();
        logged();
    };

    return (
        <Router>
            <Redirect to="/home"/>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="absolute"
                    className={clsx(classes.appBar, open && classes.appBarShift)}
                >
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(
                                classes.menuButton,
                                open && classes.menuButtonHidden
                            )}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Dashboard
                        </Typography>
                        <Button color="inherit" onClick={onLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <ListItem button component={Link} to="/home">
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItem>
                        <ListItem button component={Link} to="/profile">
                            <ListItemIcon>
                                <AccountBoxIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Profile"/>
                        </ListItem>
                        <ListItem button component={Link} to="/stations">
                            <ListItemIcon>
                                <TransferWithinAStationIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Stations"/>
                        </ListItem>
                        <ListItem button component={Link} to="/rails">
                            <ListItemIcon>
                                <DirectionsRailwayIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Rails"/>
                        </ListItem>
                        <ListItem button component={Link} to="/incidents">
                            <ListItemIcon>
                                <RailwayAlertIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Incidents"/>
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Switch>
                            <Route exact path="/home">
                                <Home/>
                            </Route>
                            <Route exact path="/stations">
                                <Stations/>
                            </Route>
                            <Route exact path="/rails">
                                <Rails/>
                            </Route>
                            <Route exact path="/incidents">
                                <Incidents/>
                            </Route>
                            <Route exact path="/profile">
                                <Profile/>
                            </Route>
                        </Switch>
                        <Box pt={4}>
                            <Copyright/>
                        </Box>
                    </Container>
                </main>
            </div>
        </Router>
    );
}
