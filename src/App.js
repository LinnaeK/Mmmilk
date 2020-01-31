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
import SavedCharts from './components/SavedCharts/SavedCharts'
import Chart from './components/Chart/Chart'
import SideBar from './components/sideBar/sideBar'
import MilkNav from './components/milkNav/milkNav'
import CssBaseline from '@material-ui/core/CssBaseline';



export default function App (props){
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
      NT_BF_EXBF: false,
      NT_BF_PRED_BF: false,
      NT_BF_CBF_12_15: false,
      NT_BF_CBF_12_23: false,
      NT_BF_CBF_20_23: false,
      NT_BF_EBF: false,
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
      countryMsg= "(select one)"
      ageMsg="(select up to three)"
    }else{
      countryMsg="(select up to three)"
      ageMsg="(select one)"
    }
    useCountryMessage(countryMsg)
    useAgeMessage(ageMsg)
    useHandleResetClick()
  }

  const useHandleResetClick = () => {
    useAge([])
    useCountry([])
    useIsEnabled(true)
    useCheckboxes({
      NT_BF_EXB: false,
      NT_BF_PRED_BF: false,
      NT_BF_CBF_12_15: false,
      NT_BF_CBF_12_23: false,
      NT_BF_CBF_20_23: false,
      NT_BF_EBF: false,
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
    console.log('checking checkboxes', e.target.value, checkboxes, checkboxes["NT_BF_EXBF"], checkboxes[e.target.value])
    useAge(ages)
    useAgeMessage(ageMsg)
    useIsEnabled(enabled)
    useCheckboxes({
      ...checkboxes,
      [e.target.value]:!checkboxes[e.target.value]
    })
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

    





  return(
    <div className={classes.root}>
      <CssBaseline />
      <MilkNav 
      user={user}
      useHandleSavedChartsClick={useHandleSavedChartsClick}
      handleDrawerToggle={handleDrawerToggle}
      handleLogout={handleLogout}
      />
      <SideBar 
      mobileOpen = {mobileOpen}
      handleDrawerToggle = {handleDrawerToggle}
      user={user}
      useHandleRadioClick={useHandleRadioClick}
      countryMessage={countryMessage}
      country={country}
      multiple={multiple}
      useHandleChangeMultiple={useHandleChangeMultiple}
      useHandleAgeClick={useHandleAgeClick}
      isEnabled={isEnabled}
      ageMessage={ageMessage}
      checkboxes={checkboxes}
      useHandleChartClick={useHandleChartClick}
      useHandleResetClick={useHandleResetClick}
      useHandleSaveClick={useHandleSaveClick}
      />
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
            savedCharts={savedCharts}
            rawSavedCharts={rawSavedCharts}
            handleDelete={useHandleDelete}
            />
        }/>
      <Route exact path='/signup' render={({ history }) =>
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
        </Switch>
        </main>
      </div>
    )
}


