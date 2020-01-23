import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import SelectComparison from '../SelectComparison/SelectComparison'
import SelectCountry from '../SelectCountry/SelectCountry'
import SelectAgeGroup from '../SelectAgeGroup/SelectAgeGroup'
import Chart from '../Chart/Chart'
import Buttons from '../Buttons/Buttons'
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export default function ResponsiveDrawer(props: ResponsiveDrawerProps) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  
    let nav = props.user ?
    <span>
        <span>{`Welcome, ${props.user.name}`} </span>
        <Link to='/saved-charts' className='NavBar-link' onClick={props.handleLinkClick}>
            {'Saved Charts'}
        </Link>
        <Link to = '' className='NavBar-link' onClick={props.handleLogout}>
            {'Log Out'}
        </Link>
    </span>
    :
    <span>
        <Link to='/login' className='NavBar-link'>
        {'Log In'}
        </Link>
        <Link to='/signup' className='NavBar-link'>
            {'Sign Up'}
        </Link>
    </span>


  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <SelectComparison user={props.user} handleRadioClick={props.handleRadioClick}/>
      <SelectCountry 
        handleCountryClick={props.handleCountryClick}
        countryMessage={props.countryMessage}
        country={props.country}
        multiple={props.multiple}
        handleChangeMultiple={props.handleChangeMultiple}
        />
      <SelectAgeGroup 
        handleAgeClick={props.handleAgeClick} 
        handleChange={props.handleChange}
        country={props.country} 
        isEnabled={props.isEnabled}
        ageMessage={props.ageMessage}
        twelveToFifteen={props.twelveToFifteen}
        twelveToTwentyThree={props.twelveToTwentyThree}
        twentyToTwentyThree={props.twentyToTwentyThree}
        everBF={props.everBF}
        eZeroToFive={props.eZeroToFive}
        pZeroToFive={props.pZeroToFive}
        />
        <Buttons 
        handleChartClick={props.handleChartClick}
        handleResetClick={props.handleResetClick}
        handleSaveClick={props.handleSaveClick}
        />
    </div>
  );

  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mmmilk {nav}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Chart chartData={props.chartData}/>
      </main>
    </div>
  );
}
