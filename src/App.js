import React, { Component, useState } from 'react';
import './App.css'
import LoginPage from './components/LoginPage/LoginPage'
import { Route, Switch, Redirect } from 'react-router-dom'
import dataService from './utils/dataService'
import SignupPage from './pages/SignupPage/SignupPage';
import userService from './utils/userService';
import chartService from './utils/chartService';

import ResponsiveDrawer from './components/ResponsiveDrawer/ResponsiveDrawer';

function App {
      const [user, setUser] = useState(userService.getUser())
      const [comparisonByItem, useComparison]= useState('Country'),
      const [country, useCountry] = useState([]
      const [multiple, useMultiple] = useState(false
      const [countryMessage, useCountryMessage]= useState("(select one)"),,
      const [age, useAge] = useState([]),
      const [isEnabled, useIsEnabled] = useState(true),
      const [ageMessage, useAgeMessage] = useState("(select up to three)"),
      const [checkboxes, useCheckboxes] = useState({
        twelveToFifteen : false,
        twelveToTwentyThree : false,
        twentyToTwentyThree : false,
        everBF: false,
        eZeroToFive : false,
        pZeroToFive : false,

      })
      const [chartData, useChartDate] = useState(''),
      const [savedCharts, useSavedCharts] = useState([]),
      const [rawSavedCharts, useRawSavedCharts] = useState([]),
  
  //Not sure if this function is needed
  // const handleChange = name => event => {
  //   setCheckboxes({
  //     ...checkboxes,
  //     [name] : event.target.checked
  //   })
  // }


  const handleRadioClick = (e) => {
    e.persist()
    useComparison(e.target.value)
    handleResetClick()
    if(e.target.value==="Country"){
// might need to useMultiple(true) here.
// would rather put a terenary/boolean in SelectCountry if needed
      useCountryMessage("(select one")
      useAgeMessage("(select up to three)")
    }else{
      useAgeMessage("(select one")
      useCountryMessage("(select up to three)")
    }
  }

  const handleResetClick = () => {
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
  

  const handleAgeClick = (e) => {
    e.persist()
    if(comparisonByItem==='Age'){
      console.log('run inside age')
      if(age.some((age)=>{return e.target.value===age})){
        let filteredAge = age.filter((age)=>{return age!=e.target.value})
          useAge(filteredAge)
          useIsEnabled(true)
      }else{
        console.log('ran age')
        useAge([e.target.value])
        useIsEnabled(false)
      }
    }else{
      console.log('ran this')
      let currentAgeSelection = [...age]
      if(age.some((age)=>{return e.target.value===age})){
        let filteredAge = age.filter((age)=>{return age!=e.target.value})
        useAge(filteredAge)
        useIsEnabled(true)
      }else{
        if(currentAgeSelection.length<2){
          console.log('ran inside')
          currentAgeSelection.push(e.target.value)
          useAge(currentAgeSelection) 
          useIsEnabled(true)
          console.log('almost out')
        }else if(currentAgeSelection.length===2){
          currentAgeSelection.push(e.target.value)
          useAgeMessage("Max three age ranges") 
          useIsEnabled(false)
          useAge(currentAgeSelection)
        }
      }
    }
  }


  const handleChangeMultiple = event => {
    console.log('in handleChangeMultiple')
    const value = [...country];
    const { options } = event.target;
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        if(value.some((v)=>{return v===options[i].value })){
          console.log('in some')
          value.splice(value.indexOf(options[i].value), 1)
          useCountry(value)
        }else{
          if(comparisonByItem==="Country"){
            useCountry([options[i].value])
          }else if(country.length<3){
            value.push(options[i].value);
            useCountry(value)
            if(country.length===2){
              useCountryMessage("Max three countries")
            }
          }
        }
      }
    }
  };

  const handleChartData = (data) => {
    useChartData(data)
    console.log(chartData)
  }

  const handleChartClick = async () => {
    console.log('chart clicked')
    let newData = await dataService.index(comparisonByItem, country, age)
    handleChartData(newData)
    console.log("set in state", chartData)
  }

  const handleSaveClick = async() => {
    let chartDetails = {
      comparisonByItem: comparisonByItem,
      country: country,
      indicators: age
    }
    let saveData = await chartService.create(chartDetails)
    console.log('savedData: ', saveData)
  }
  
  const handleSignupOrLogin = () => {
    useUser(userService.getUser())
  }

  const handleSavedChartsClick = async() => {
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

  const handleDelete = async(id) => {
    console.log('inside handleDelete', savedCharts, rawSavedCharts[id]._id)
    let deletedChart = await chartService.deleteOne(rawSavedCharts[id]._id)
    console.log(deletedChart)
    handleSavedChartsClick()
  }

  const handleLogout = () => {
    userService.logout()
    useUser(null)
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
          handleResetClick={handleResetClick}
          handleDelete={handleDelete}
          handleLogout={handleLogout} 
          handleRadioClick={handleRadioClick}
          handleCountryClick={handleCountryClick}
          handleAgeClick={handleAgeClick}
          handleChartClick={handleChartClick}
          handleSaveClick={handleSaveClick}
          handleChange={handleChange}
          handleChangeMultiple={handleChangeMultiple}
          handleSavedChartsClick={handleSavedChartsClick}
          twelveToFifteen={twelveToFifteen}
          twelveToTwentyThree={twelveToTwentyThree}
          twentyToTwentyThree={twentyToTwentyThree}
          everBF={everBF}
          eZeroToFive={eZeroToFive}
          pZeroToFive={pZeroToFive}
          multiple={multiple}
          country={country}
          age={age}
          chartData={chartData}
          handleSignupOrLogin={handleSignupOrLogin}
          history={history}
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
