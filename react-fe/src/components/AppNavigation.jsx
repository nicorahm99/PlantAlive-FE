import React from 'react';
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
import { customTheme } from '../commons/theme';
import {useHistory} from 'react-router-dom';
import { logOut } from '../commons/utils';


const drawerWidth = 240;
const palette = customTheme;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontFamily: "'Teko', sans-serif !important",
        color: palette.primary.text
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        color: palette.primary.text,
        backgroundColor: palette.primary.main,
        zIndex: theme.zIndex.drawer + 1,
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
        backgroundColor: palette.primary.text,
        color: palette.primary.dark
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


export default function AppNavigation(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button key='Home' onClick={() => history.push("/home")} >
            <ListItemIcon><Icon iconName="home"/></ListItemIcon>
            <ListItemText primary='Home'/>
          </ListItem>
  
          <ListItem button key='Pflanze Hinzufügen' onClick={() => history.push("/new")} >
              <ListItemIcon><Icon iconName="add"/></ListItemIcon>
              <ListItemText primary='Pflanze Hinzufügen'/>
          </ListItem>
  
          <ListItem button key='Einstellungen' onClick={() => history.push("/settings")} >
          <ListItemIcon><Icon iconName="settings"/></ListItemIcon>
              <ListItemText primary='Einstellungen'/>
          </ListItem>

          <ListItem button key='Ausloggen' onClick={() => logOut(history)} >
          <ListItemIcon><Icon iconName="exitToApp"/></ListItemIcon>
              <ListItemText primary='Ausloggen'/>
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
        {props.children}
      </main>
      <Background />
      </div>
    );
  }