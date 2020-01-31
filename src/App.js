import React, { Component, useState } from 'react';
import './App.css'
import LoginPage from './components/LoginPage/LoginPage'
import { Route, Switch, Redirect } from 'react-router-dom'
import dataService from './utils/dataService'
import SignupPage from './pages/SignupPage/SignupPage';
import userService from './utils/userService';
import chartService from './utils/chartService';

import ResponsiveDrawer from './components/ResponsiveDrawer/ResponsiveDrawer';

function App (){
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

  const useHandleChartData = (data) => {
    useChartData(data)
  }

  const useHandleChartClick = async () => {
    console.log('chart clicked')
    let newData = await dataService.index(comparisonByItem, country, age)
    useHandleChartData(newData)
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
    <div>
      {/* <Switch>
        <Route exact path='/' render={() => */}
        <ResponsiveDrawer 
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
          />  
      }/>
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

export default App;
