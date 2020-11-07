import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import SwipableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Icon from '../components/Icon';
import Background from '../components/Background';
import PlantCard from '../components/PlantCard';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontFamily: "'Teko', sans-serif !important"
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        color:'#000000',
        backgroundColor: '#31572C',
        zIndex: theme.zIndex.drawer + 1,
        // [theme.breakpoints.up('md')]: {
        //     width: `calc(100%)`,
        //     // marginLeft: drawerWidth,
        // },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar:{
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    }   
}));

export default function Home(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [plants, setPlants] = React.useState([]);
  const testArray = Array.from(Array(15).keys())

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key='Home' >
          <ListItemIcon><Icon iconName="home"/></ListItemIcon>
          <ListItemText primary='Home'/>
        </ListItem>

        <ListItem button key='Pflanze Hinzufügen'>
            <ListItemIcon><Icon iconName="add"/></ListItemIcon>
            <ListItemText primary='Pflanze Hinzufügen'/>
        </ListItem>

        <ListItem button key='Einstellungen'>
        <ListItemIcon><Icon iconName="settings"/></ListItemIcon>
            <ListItemText primary='Einstellungen'/>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Icon iconName='menu' />
          </IconButton>
          <Typography variant="h4" noWrap style={{fontFamily:"'Teko', sans-serif !important"}}>
            PlantAlive
          </Typography>
          <Icon iconName="LOGO" className="AppBar_Icon" />
        </Toolbar>
      </AppBar>
      
      <nav className={classes.drawer} aria-label="menu">
        <Hidden smUp implementation="css">
          <SwipableDrawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onOpen={handleDrawerToggle}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </SwipableDrawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <SwipableDrawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
            onOpen={() => null}
            onClose={() => null}
          >
            {drawer}
          </SwipableDrawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="pageHome_cardContainer">
          {testArray.map(() => {
            return mockPlantCard()
          })}
        </div>
      </main>
      <Background />
    </div>
  );
}

const mockPlantCard = () => {
  return (<PlantCard 
    src="../assets/samplePlant.svg" 
    location="Wohnzimmer" 
    plantName="Schefflera"
    humidity={80} 
    temperature={21}
  />)
}

Home.propTypes = {
  window: PropTypes.func,
};