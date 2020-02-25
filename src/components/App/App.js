import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import dataService from '../../utils/dataService'
import userService from '../../utils/userService';
import chartService from '../../utils/chartService';

import './App.css'
import useStyles from './AppStyle'
import './ResponsiveDrawer.css'

import LoginPage from '../LoginPage/LoginPage'
import SignupPage from '../../pages/SignupPage/SignupPage';
import SavedCharts from '../SavedCharts/SavedCharts'
import Chart from '../Chart/Chart'
import SideBar from '../SelectionBar/SelectionBar'
import MilkNav from '../milkNav/milkNav'
import CssBaseline from '@material-ui/core/CssBaseline';



export default function App (props){
  //I would move state as low as you possibly
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [user, setUser] = useState(userService.getUser()) //put in context or redux
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
    }) // a good example of where you can use useReducer to simplify
    const [chartData, useChartData] = useState('')
    const [savedCharts, setSavedCharts] = useState([])
    const [rawSavedCharts, setRawSavedCharts] = useState([])

// <---- login functions ---> //

const handleSignupOrLogin = () => {
  setUser(userService.getUser())
}

const handleLogout = () => {
  userService.logout()
  setUser(null)
}

  // <--- Data functions ---> //

  async function fetchData(){
    let viewCharts = await chartService.index()
    let savedCharts = []
    for(let i = 0; i<viewCharts.length; i++){ // refactor to a .map
        let savedData = await dataService.index(viewCharts[i].comparisonByItem, viewCharts[i].country, viewCharts[i].indicators)
        savedCharts.push(savedData)
    }
    viewCharts = viewCharts.reverse()
    setRawSavedCharts(viewCharts)
    savedCharts = savedCharts.reverse()
    setSavedCharts(savedCharts)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const useHandleSaveClick = async() => {
    let chartDetails = {
      comparisonByItem: comparisonByItem,
      country: country,
      indicators: age
    }
    let saveData = await chartService.create(chartDetails)
    fetchData()
    props.history.push('/savedcharts')
  }
   
  const useHandleDelete = async(id) => {
    let deletedChart = await chartService.deleteOne(rawSavedCharts[id]._id)
    let updateRaw = rawSavedCharts
    updateRaw.splice(id, 1)
    let updateSave = savedCharts
    updateSave.splice(id, 1)
    fetchData()
  }


  // <---- Handle User Selection Input ---> //

  const useHandleAgeClick = (e) => {
    e.persist()
    let ages = [...age]
    let enabled = true
    let ageMsg = ageMessage
    if(comparisonByItem==='Age'){
      if(age.some((age)=>{return e.target.value===age})){
        ages = age.filter((age)=>{return age!=e.target.value})
      }else{
        ages = [e.target.value]
        enabled = false
      }
    }else{
      if(age.some((age)=>{return e.target.value===age})){
        ages = age.filter((age)=>{return age!=e.target.value})
      }else{
        if(ages.length<2){
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
    useCheckboxes({
      ...checkboxes,
      [e.target.value]:!checkboxes[e.target.value]
    })
  }
 //break into smaller parts
 
  const useHandleChangeMultiple = event => {
    const value = [...country];
    const { options } = event.target;
    let cntry
    let cntryMsg = countryMessage
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        if(value.some((v)=>{return v===options[i].value })){
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
    let newData = await dataService.index(comparisonByItem, country, age)
    useChartData(newData)
  }

  const useHandleRadioClick = (e) => {
    e.persist()
    useComparison(e.target.value)
    useHandleResetClick()
    let countryMsg = ""
    let ageMsg = ""
    if(e.target.value==="Country"){
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
    useIsEnabled(true)
    useCheckboxes({
      NT_BF_EXB: false,
      NT_BF_PRED_BF: false,
      NT_BF_CBF_12_15: false,
      NT_BF_CBF_12_23: false,
      NT_BF_CBF_20_23: false,
      NT_BF_EBF: false,
    })
    useChartData('')
  }

  // <--- mobile responsive functions ---> //

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  
  return(
    <div className={classes.root}>
      <CssBaseline />
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
      history={props.history}
      />
      <MilkNav 
      user={user}
      // useHandleSavedChartsClick={useHandleSavedChartsClick}
      handleDrawerToggle={handleDrawerToggle}
      handleLogout={handleLogout}
      />
      <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route exact path='/' render={() =>
            <Chart 
            chartData={chartData}
            age={age}
            country={country}
            user={user}
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


