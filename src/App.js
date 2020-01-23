import React, { Component } from 'react';
import './App.css'
import LoginPage from './components/LoginPage/LoginPage'
import { Route, Switch, Redirect } from 'react-router-dom'
import dataService from './utils/dataService'
import SignupPage from './pages/SignupPage/SignupPage';
import userService from './utils/userService';
import chartService from './utils/chartService';

import ResponsiveDrawer from './components/ResponsiveDrawer/ResponsiveDrawer';

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: userService.getUser(),
      comparisonByItem: 'Country',
      country:[],
      multiple: false,
      countryMessage: "(select one)",
      age:[],
      isEnabled:true,
      ageMessage:"(select up to three)",
      twelveToFifteen: false,
      twelveToTwentyThree: false,
      twentyToTwentyThree: false,
      everBF: false,
      eZeroToFive: false,
      pZeroToFive: false,
      chartData: '',
      savedCharts:[],
      rawSavedCharts: []
    }
  }


  handleChange = name => event => {
      this.setState({[name]: event.target.checked });
  };

  handleRadioClick = (e) => {
    e.persist()
    this.setState({
      comparisonByItem:e.target.value,
      age:[],
      country:[],
      isEnabled:true,
      twelveToFifteen: false,
      twelveToTwentyThree: false,
      twentyToTwentyThree: false,
      everBF: false,
      eZeroToFive: false,
      pZeroToFive: false,
    })
    if(e.target.value==="Country"){
      this.setState({
        countryMessage: "(select one)",
        ageMessage: "(select up to three)",
        multiple:false
      })
    }else{
      this.setState({
          countryMessage: "(select up to three)",
          ageMessage: "(select one)",
          multiple:true 
        })
    }
  }

  handleResetClick = () => {
    this.setState({
      age:[],
      country:[],
      isEnabled:true,
      twelveToFifteen: false,
      twelveToTwentyThree: false,
      twentyToTwentyThree: false,
      everBF: false,
      eZeroToFive: false,
      pZeroToFive: false,
    })
  }
  // handleCountryClick = (e) => {
  //   e.persist()
  //   if(this.state.comparisonByItem==='Country'){
  //     console.log('ran country')
  //     this.setState({country:[e.target.value]})
  //   }else{
  //     console.log('ran this')
  //     let currentCountrySelection = [...this.state.country]
  //     if(this.state.country.some((country)=>{return e.target.value===country})){
  //       let filteredCountries = this.state.country.filter((country)=>{return country!=e.target.value})
  //       this.setState({country: filteredCountries})
  //     }else{
  //       if(currentCountrySelection.length>2){
  //         this.setState({countryMessage: false})
  //       }else{
  //         currentCountrySelection.push(e.target.value)
  //         console.log(currentCountrySelection)
  //         this.setState({country: currentCountrySelection})
  //       }
  //     }
  //   }
  // }

  handleAgeClick = (e) => {
    e.persist()
    if(this.state.comparisonByItem==='Age'){
      console.log('run inside age')
      if(this.state.age.some((age)=>{return e.target.value===age})){
        let filteredAge = this.state.age.filter((age)=>{return age!=e.target.value})
        this.setState({
          age: filteredAge,
          isEnabled:true,
        })
      }else{
      console.log('ran age')
      this.setState({
        age:[e.target.value],
        isEnabled:false
      })
    }
    }else{
      console.log('ran this')
      let currentAgeSelection = [...this.state.age]
      if(this.state.age.some((age)=>{return e.target.value===age})){
        let filteredAge = this.state.age.filter((age)=>{return age!=e.target.value})
        this.setState({
          age: filteredAge,
          isEnabled:true,
        })
      }else{
        if(currentAgeSelection.length<2){
          console.log('ran inside')
          currentAgeSelection.push(e.target.value)
          this.setState({
            age: currentAgeSelection, 
            isEnabled:true
          })
          console.log('almost out')
        }else if(currentAgeSelection.length===2){
          currentAgeSelection.push(e.target.value)
          this.setState({
            ageMessage: "Max three age ranges", 
            isEnabled:false,
            age: currentAgeSelection
           })
           console.log(this.state.age)
        }
      }
    }
  }


  handleChangeMultiple = event => {
    console.log('in handleChangeMultiple')
    const value = [...this.state.country];
    const { options } = event.target;
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        if(value.some((v)=>{return v===options[i].value })){
          console.log('in some')
          value.splice(value.indexOf(options[i].value), 1)
          this.setState({country:value})
        }else{
          if(this.state.comparisonByItem==="Country"){
            this.setState({
              country:[options[i].value]
            })
          }else if(this.state.country.length<3){
            value.push(options[i].value);
            this.setState({
              country: value
            })
            if(this.state.country.length===2){
              this.setState({
                countryMessage:"Max three countries"
              })
            }
          }
        }
      }
    }
  };

  handleChartData = (data) => {
    this.setState({chartData:data})
    console.log(this.state.chartData)
  }

  handleChartClick = async () => {
    console.log('chart clicked')
    let newData = await dataService.index(this.state.comparisonByItem, this.state.country, this.state.age)
    this.handleChartData(newData)
    console.log("set in state", this.state.chartData)
  }

  handleSaveClick = async() => {
    let chartDetails = {
      comparisonByItem: this.state.comparisonByItem,
      country: this.state.country,
      indicators: this.state.age
    }
    let saveData = await chartService.create(chartDetails)
    console.log('savedData: ', saveData)
  }
  
  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleSavedChartsClick = async() => {
    console.log('ready to ask for historical data')
    let viewCharts = await chartService.index()
    console.log('viewCharts', viewCharts)
    let savedCharts = []
    for(let i = 0; i<viewCharts.length; i++){
      let savedData = await dataService.index(viewCharts[i].comparisonByItem, viewCharts[i].country, viewCharts[i].indicators)
      savedCharts.push(savedData)
    }
    console.log("me got clicked", viewCharts)
    this.setState({
      savedCharts:savedCharts,
      rawSavedCharts: viewCharts
    })
  }

  handleDelete = async(id) => {
    console.log('inside handleDelete', this.state.savedCharts, this.state.rawSavedCharts[id]._id)
    let deletedChart = await chartService.deleteOne(this.state.rawSavedCharts[id]._id)
    console.log(deletedChart)
    this.handleSavedChartsClick()
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  render(){
    return(
      <div>
        {/* <Switch>
          <Route exact path='/' render={() => */}
          <ResponsiveDrawer 
            user={this.state.user}
            savedCharts = {this.state.savedCharts}
            rawSavedCharts = {this.state.rawSavedCharts}
            countryMessage={this.state.countryMessage} 
            ageMessage={this.state.ageMessage} 
            isEnabled={this.state.isEnabled}
            handleResetClick={this.handleResetClick}
            handleDelete={this.handleDelete}
            handleLogout={this.handleLogout} 
            handleRadioClick={this.handleRadioClick}
            handleCountryClick={this.handleCountryClick}
            handleAgeClick={this.handleAgeClick}
            handleChartClick={this.handleChartClick}
            handleSaveClick={this.handleSaveClick}
            handleChange={this.handleChange}
            handleChangeMultiple={this.handleChangeMultiple}
            handleSavedChartsClick={this.handleSavedChartsClick}
            twelveToFifteen={this.state.twelveToFifteen}
            twelveToTwentyThree={this.state.twelveToTwentyThree}
            twentyToTwentyThree={this.state.twentyToTwentyThree}
            everBF={this.state.everBF}
            eZeroToFive={this.state.eZeroToFive}
            pZeroToFive={this.state.pZeroToFive}
            multiple={this.state.multiple}
            country={this.state.country}
            age={this.state.age}
            chartData={this.state.chartData}
            />  
        }/>
        {/* <Route exact path='/signup' render={({ history }) =>
          <SignupPage
            history = {history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        }/>
        <Route exact path='/login' render={({ history }) =>
          <LoginPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        }/>
        </Switch> */}
      </div>
    )
  }
}

export default App;
