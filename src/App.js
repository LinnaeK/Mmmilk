import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router-dom'

import dataService from './utils/dataService'
import userService from './utils/userService';
import chartService from './utils/chartService';

import './App.css'
import useStyles from './AppStyle'
import './ResponsiveDrawer.css'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

import LoginPage from './components/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage';
import SelectComparison from './components/SelectComparison/SelectComparison'
import SelectCountry from './components/SelectCountry/SelectCountry'
import SelectAgeGroup from './components/SelectAgeGroup/SelectAgeGroup'
import SavedCharts from './components/SavedCharts/SavedCharts'
import Chart from './components/Chart/Chart'
import Buttons from './components/Buttons/Buttons'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import ResponsiveDrawer from './components/ResponsiveDrawer/ResponsiveDrawer';


export default function App (props: ResponsiveDrawerProps){
    const drawerWidth = 240;

    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [user, setUser] = useState(userService.getUser())
    const [comparisonByItem, useComparison]= useState('Country')
    const [country, useCountry] = useState([])
    const [multiple, useMultiple] = useState(false)
    const [countryMessage, useCountryMessage]= useState("(select one)")
    const [age, useAge] = useState([])
    const [isEnabled, useIsEnabled] = useState(true)
    const [ageMessage, useAgeMessage] = useState("(select up to three)")
    const [checkboxes, useCheckboxes] = useState({
      twelveToFifteen : false,
      twelveToTwentyThree : false,
      twentyToTwentyThree : false,
      everBF: false,
      eZeroToFive : false,
      pZeroToFive : false,

    })
    const [chartData, useChartData] = useState('')
    const [savedCharts, useSavedCharts] = useState([])
    const [rawSavedCharts, useRawSavedCharts] = useState([])

  //Not sure if this function is needed
  // const useHandleChange = name => event => {
  //   useCheckboxes({
  //     ...checkboxes,
  //     [name] : event.target.checked
  //   })
  // }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const useHandleRadioClick = (e) => {
    e.persist()
    useComparison(e.target.value)
    useHandleResetClick()
    let countryMsg = ""
    let ageMsg = ""
    if(e.target.value==="Country"){
// might need to useMultiple(true) here.
// would rather put a terenary/boolean in SelectCountry if needed
      countryMsg= "(select one"
      ageMsg="(select up to three)"
    }else{
      countryMsg="(select up to three)"
      ageMsg="(select one"
    }
    useCountryMessage(countryMsg)
    useAgeMessage(ageMsg)
  }

  const useHandleResetClick = () => {
    useAge([])
    useCountry([])
    useIsEnabled(true)
    useCheckboxes({
      twelveToFifteen: false,
      twelveToTwentyThree: false,
      twentyToTwentyThree: false,
      everBF: false,
      eZeroToFive: false,
      pZeroToFive: false,
    })
  }
  

  const useHandleAgeClick = (e) => {
    e.persist()
    let ages = [...age]
    let enabled = true
    let ageMsg = ageMessage
    if(comparisonByItem==='Age'){
      console.log('run inside age')
      if(age.some((age)=>{return e.target.value===age})){
        ages = age.filter((age)=>{return age!=e.target.value})
      }else{
        console.log('ran age')
        ages = [e.target.value]
        enabled = false
      }
    }else{
      console.log('ran this')
      if(age.some((age)=>{return e.target.value===age})){
        ages = age.filter((age)=>{return age!=e.target.value})
      }else{
        if(ages.length<2){
          console.log('ran inside')
          ages.push(e.target.value)
        }else if(ages.length===2){
          ages.push(e.target.value)
          ageMsg = "Max three age ranges" 
          enabled = false
        }
      }
    }
    useAge(ages)
    useAgeMessage(ageMsg)
    useIsEnabled(enabled)
  }


  const useHandleChangeMultiple = event => {
    console.log('in handleChangeMultiple')
    const value = [...country];
    const { options } = event.target;
    let cntry
    let cntryMsg = countryMessage
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        if(value.some((v)=>{return v===options[i].value })){
          console.log('in some')
          value.splice(value.indexOf(options[i].value), 1)
          cntry = value
        }else{
          if(comparisonByItem==="Country"){
            cntry = [options[i].value]
          }else if(country.length<3){
            value.push(options[i].value);
            cntry = value
            if(country.length===2){
              cntryMsg = "Max three countries"
            }
          }
        }
      }
    }
    useCountry(cntry)
    useCountryMessage(cntryMsg)
  };

  // const useChartData = (data) => {
  //   console.log("data", data)
  //   useChartData(data)
  // }

  const useHandleChartClick = async () => {
    console.log('chart clicked')
    let newData = await dataService.index(comparisonByItem, country, age)
    useChartData(newData)
    console.log('newData', newData)
    console.log("set in state", chartData)
  }

  const useHandleSaveClick = async() => {
    let chartDetails = {
      comparisonByItem: comparisonByItem,
      country: country,
      indicators: age
    }
    let saveData = await chartService.create(chartDetails)
    console.log('savedData: ', saveData)
  }
  
  const handleSignupOrLogin = () => {
    setUser(userService.getUser())
  }

  const useHandleSavedChartsClick = async() => {
    console.log('ready to ask for historical data')
    let viewCharts = await chartService.index()
    console.log('viewCharts', viewCharts)
    let savedCharts = []
    for(let i = 0; i<viewCharts.length; i++){
      let savedData = await dataService.index(viewCharts[i].comparisonByItem, viewCharts[i].country, viewCharts[i].indicators)
      savedCharts.push(savedData)
    }
    console.log("me got clicked", viewCharts)
    useSavedCharts(savedCharts)
    useRawSavedCharts(viewCharts)
  }

  const useHandleDelete = async(id) => {
    console.log('inside handleDelete', savedCharts, rawSavedCharts[id]._id)
    let deletedChart = await chartService.deleteOne(rawSavedCharts[id]._id)
    console.log(deletedChart)
    useHandleSavedChartsClick()
  }

  const handleLogout = () => {
    userService.logout()
    setUser(null)
  }

    
  let nav = user ?
  <span className={'toRight'}>
      <span>{`Welcome, ${user.name}`} </span>
      <Link to='/savedcharts' className='NavBar-link' style={{ textDecoration: 'none', marginRight: 20}} onClick={useHandleSavedChartsClick}>
          {'Saved Charts'}
      </Link>
      <Link to='/' style={{ textDecoration: 'none', marginRight: 20 }} className='NavBar-link'>
          {'Create Chart'}
      </Link>
      <Link to = '' className='NavBar-link' style={{ textDecoration: 'none', marginRight: 20}} onClick={handleLogout}>
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
    <SelectComparison user={user} handleRadioClick={useHandleRadioClick}/>
    <SelectCountry 
      // handleCountryClick={useHandleCountryClick}
      countryMessage={countryMessage}
      country={country}
      multiple={multiple}
      handleChangeMultiple={useHandleChangeMultiple}
      />
    <SelectAgeGroup 
      handleAgeClick={useHandleAgeClick} 
      // handleChange={handleChange}
      country={country} 
      isEnabled={isEnabled}
      ageMessage={ageMessage}
      checkboxes={checkboxes}
      />
      <Buttons 
      handleChartClick={useHandleChartClick}
      handleResetClick={useHandleResetClick}
      handleSaveClick={useHandleSaveClick}
      />
  </div>

);

  return(
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
            chartData={chartData}
            age={age}
            country={country}
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
            history = {props.history}
            handleSignupOrLogin={props.handleSignupOrLogin}
          />
        }/>
        <Route exact path='/login' render={({ history }) =>
          <LoginPage
            history={props.history}
            handleSignupOrLogin={props.handleSignupOrLogin}
          />
        }/>
        </Switch>
        </main>
      {/* <Switch>
        <Route exact path='/' render={() => */}
        {/* <ResponsiveDrawer 
          user={user}
          savedCharts = {savedCharts}
          rawSavedCharts = {rawSavedCharts}
          countryMessage={countryMessage} 
          ageMessage={ageMessage} 
          isEnabled={isEnabled}
          handleResetClick={useHandleResetClick}
          handleDelete={useHandleDelete}
          handleLogout={handleLogout} 
          handleRadioClick={useHandleRadioClick}
          // handleCountryClick={useHandleCountryClick}
          handleAgeClick={useHandleAgeClick}
          handleChartClick={useHandleChartClick}
          handleSaveClick={useHandleSaveClick}
          // handleChange={useHandleChange}
          handleChangeMultiple={useHandleChangeMultiple}
          handleSavedChartsClick={useHandleSavedChartsClick}
          checkboxes={checkboxes}
          multiple={multiple}
          country={country}
          age={age}
          chartData={chartData}
          handleSignupOrLogin={handleSignupOrLogin}
          // history={history}
          />   */}
      {/* }/> */}
        {/* <Route exact path='/signup' render={({ history }) =>
          <SignupPage
            history = {history}
            handleSignupOrLogin={handleSignupOrLogin}
          />
        }/>
        <Route exact path='/login' render={({ history }) =>
          <LoginPage
            history={history}
            handleSignupOrLogin={handleSignupOrLogin}
          />
        }/>
        </Switch> */}
      </div>
    )
}


