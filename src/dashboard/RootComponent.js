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
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Stations from "../stations/Stations";
import Rails from "../rails/Rails";
import RailwayAlertIcon from '@mui/icons-material/RailwayAlert';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DirectionsIcon from '@mui/icons-material/Directions';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StationsForm from "../stations/StationsForm";
import RailsForm from "../rails/RailsForm";
import IncidentsForm from "../incident/IncidentsForm";
import TrainRoutes from "../train-routes/TrainRoutes";
import TrainRoutesForm from "../train-routes/TrainRoutesForm";
import SubstituteRoutesForm from "../substitute-routes/SubstituteRoutesForm";
import SubstituteRoutes from "../substitute-routes/SubstituteRoutes";
import Report from "../report/Report";
import ChauffeursForm from "../chauffeurs/ChauffeursForm";
import Chauffeurs from "../chauffeurs/Chauffeurs";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HouseIcon from '@mui/icons-material/House';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import TransportCompaniesForm from "../transport-company/TransportCompaniesForm";
import TransportCompanies from "../transport-company/TransportCompanies";
import VehiclesForm from "../vehicles/VehiclesForm";
import Vehicles from "../vehicles/Vehicles";

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
                        <ListItem button component={Link} to="/">
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
                                <HouseIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Stations"/>
                        </ListItem>
                        <ListItem button component={Link} to="/rails">
                            <ListItemIcon>
                                <DirectionsRailwayIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Rails"/>
                        </ListItem>
                        <ListItem button component={Link} to="/train-route">
                            <ListItemIcon>
                                <DirectionsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Train route"/>
                        </ListItem>
                        <ListItem button component={Link} to="/transport-company">
                            <ListItemIcon>
                                <DepartureBoardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Transport company"/>
                        </ListItem>
                        <ListItem button component={Link} to="/vehicle">
                            <ListItemIcon>
                                <EmojiTransportationIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Vehicle"/>
                        </ListItem>
                        <ListItem button component={Link} to="/chauffeur">
                            <ListItemIcon>
                                <EmojiPeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Chauffeur"/>
                        </ListItem>
                        <ListItem button component={Link} to="/substitute-route">
                            <ListItemIcon>
                                <AltRouteIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Substitute route"/>
                        </ListItem>
                        <ListItem button component={Link} to="/incidents">
                            <ListItemIcon>
                                <RailwayAlertIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Incidents"/>
                        </ListItem>
                        <ListItem button component={Link} to="/reports">
                            <ListItemIcon>
                                <AssessmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Reports"/>
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Switch>
                            <Route exact path="/">
                                <Home/>
                            </Route>
                            <Route exact path="/stations">
                                <Stations/>
                            </Route>
                            <Route exact path="/stations/detail/:id">
                                <StationsForm/>
                            </Route>
                            <Route exact path="/train-route/new">
                                <TrainRoutesForm isNew={true}/>
                            </Route>
                            <Route exact path="/train-route">
                                <TrainRoutes/>
                            </Route>
                            <Route exact path="/train-route/detail/:id">
                                <TrainRoutesForm/>
                            </Route>
                            <Route exact path="/transport-company/new">
                                <TransportCompaniesForm isNew={true}/>
                            </Route>
                            <Route exact path="/transport-company">
                                <TransportCompanies/>
                            </Route>
                            <Route exact path="/transport-company/detail/:id">
                                <TransportCompaniesForm/>
                            </Route>
                            <Route exact path="/chauffeur/new">
                                <ChauffeursForm isNew={true}/>
                            </Route>
                            <Route exact path="/chauffeur">
                                <Chauffeurs/>
                            </Route>
                            <Route exact path="/chauffeur/detail/:id">
                                <ChauffeursForm/>
                            </Route>
                            <Route exact path="/vehicle/new">
                                <VehiclesForm isNew={true}/>
                            </Route>
                            <Route exact path="/vehicle">
                                <Vehicles/>
                            </Route>
                            <Route exact path="/vehicle/detail/:id">
                                <VehiclesForm/>
                            </Route>
                            <Route exact path="/substitute-route/new">
                                <SubstituteRoutesForm isNew={true}/>
                            </Route>
                            <Route exact path="/substitute-route">
                                <SubstituteRoutes/>
                            </Route>
                            <Route exact path="/substitute-route/detail/:id">
                                <SubstituteRoutesForm/>
                            </Route>
                            <Route exact path="/stations/new">
                                <StationsForm isNew={true}/>
                            </Route>
                            <Route exact path="/rails">
                                <Rails/>
                            </Route>
                            <Route exact path="/rails/detail/:id">
                                <RailsForm/>
                            </Route>
                            <Route exact path="/rails/new">
                                <RailsForm isNew={true}/>
                            </Route>
                            <Route exact path="/incidents">
                                <Incidents/>
                            </Route>
                            <Route exact path="/incidents/detail/:id">
                                <IncidentsForm/>
                            </Route>
                            <Route exact path="/incidents/new">
                                <IncidentsForm isNew={true}/>
                            </Route>
                            <Route exact path="/profile">
                                <Profile/>
                            </Route>
                            <Route exact path="/reports">
                                <Report/>
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
