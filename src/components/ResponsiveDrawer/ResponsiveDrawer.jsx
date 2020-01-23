import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import './ResponsiveDrawer.css'
import SelectComparison from '../SelectComparison/SelectComparison'
import SelectCountry from '../SelectCountry/SelectCountry'
import SelectAgeGroup from '../SelectAgeGroup/SelectAgeGroup'
import SavedCharts from '../SavedCharts/SavedCharts'
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
import LoginPage from '../LoginPage/LoginPage'
import { Route, Switch, Redirect } from 'react-router-dom'
import SignupPage from '../../pages/SignupPage/SignupPage';

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
    <span className={'toRight'}>
        <span>{`Welcome, ${props.user.name}`} </span>
        <Link to='/savedcharts' className='NavBar-link' style={{ textDecoration: 'none', marginRight: 20}} onClick={props.handleSavedChartsClick}>
            {'Saved Charts'}
        </Link>
        <Link to='/' style={{ textDecoration: 'none', marginRight: 20 }} className='NavBar-link'>
            {'Create Chart'}
        </Link>
        <Link to = '' className='NavBar-link' style={{ textDecoration: 'none', marginRight: 20}} onClick={props.handleLogout}>
            {'Log Out'}
        </Link>
    </span>
    :
    <span>
        <Link to='/login' style={{ textDecoration: 'none', marginRight: 20}} className='NavBar-link text'>
        {'Log In'}
        </Link>
        <Link to='/signup' style={{ textDecoration: 'none', marginRight: 20}} className='NavBar-link'>
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

  console.log('in the route:', props.savedCharts)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar >
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
          <Link to='/' className='NavBar-link' style={{ textDecoration: 'none', marginRight: 250}}>
            Mama's Milk 
          </Link>
            {nav}
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
      <Switch>
        <Route exact path='/' render={() =>
            <Chart 
            chartData={props.chartData}
            age={props.age}
            country={props.country}
            />
        }/>
        <Route exact path='/savedcharts' render={() =>
            <SavedCharts 
            savedCharts={props.savedCharts}
            rawSavedCharts={props.rawSavedCharts}
            handleDelete={props.handleDelete}
            />
        }/>
      <Route exact path='/signup' render={({ history }) =>
          <SignupPage
            history = {history}
            handleSignupOrLogin={props.handleSignupOrLogin}
          />
        }/>
        <Route exact path='/login' render={({ history }) =>
          <LoginPage
            history={history}
            handleSignupOrLogin={props.handleSignupOrLogin}
          />
        }/>
        </Switch>
        </main>
    </div>

  );
}
