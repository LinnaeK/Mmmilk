import React, { Component } from 'react';
import Nav from './components/NavBar/NavBar'
import './App.css';
// import NavBar from './components/NavBar/NavBar';
// import ResponsiveDrawer from './components/NavBar/ResponsiveDrawer';
import LoginPage from './components/LoginPage/LoginPage'
import { Route, Switch, Redirect } from 'react-router-dom'
import SignupPage from './pages/SignupPage/SignupPage';
import userService from './utils/userService';
import ResponsiveDrawer from './components/ResponsiveDrawer/ResponsiveDrawer';

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: userService.getUser(),
      comparisonByItem: 'Country',
      country:[],
      age:[],
      twelveToFifteen: false,
      twelveToTwentyThree: false,
      twentyToTwentyThree: false,
      zeroToTwentyThree: false,
      eZeroToFive: false,
      pZeroToFive: false,
    }
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.checked });
  };

  handleRadioClick = (e) => {
    e.persist()
    this.setState({country:[]})
    this.setState({[e.target.name]:e.target.value})
  }

  handleCountryClick = (e) => {
    e.persist()
    if(this.state.comparisonByItem==='Country'){
      console.log('ran country')
      this.setState({country:[e.target.value]})
    }else{
      console.log('ran this')
      let currentCountrySelection = [...this.state.country]
      if(this.state.country.some((country)=>{return e.target.value===country})){
        let filteredCountries = this.state.country.filter((country)=>{return country!=e.target.value})
        this.setState({country: filteredCountries})
      }else{
        currentCountrySelection.push(e.target.value)
        console.log(currentCountrySelection)
        this.setState({country: currentCountrySelection})
      }
    }
  }

  handleAgeClick = (e) => {
    e.persist()
    console.log('handleageclick')
    if(this.state.comparisonByItem==='Age'){
      console.log('ran age')
      this.setState({age:[e.target.value]})
    }else{
      console.log('ran this')
      let currentAgeSelection = [...this.state.age]
      if(this.state.age.some((age)=>{return e.target.value===age})){
        let filteredAge = this.state.age.filter((age)=>{return age!=e.target.value})
        this.setState({age: filteredAge})
      }else{
        currentAgeSelection.push(e.target.value)
        console.log(currentAgeSelection)
        this.setState({age: currentAgeSelection})
      }
    }
  }


  
  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  render(){
    return(
      <div>
        <Switch>
          <Route exact path='/' render={() =>
          <ResponsiveDrawer 
            user={this.state.user} 
            handleLogout={this.handleLogout} 
            handleRadioClick={this.handleRadioClick}
            handleCountryClick={this.handleCountryClick}
            handleAgeClick={this.handleAgeClick}
            handleChange={this.handleChange}
            twelveToFifteen={this.twelveToFifteen}
            twelveToTwentyThree={this.twelveToTwentyThree}
            twentyToTwentyThree={this.twentyToTwentyThree}
            zeroToTwentyThree={this.zeroToTwentyThree}
            eZeroToFive={this.eZeroToFive}
            pZeroToFive={this.pZeroToFive}
            />  
        }/>
        <Route exact path='/signup' render={({ history }) =>
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
        </Switch>
      </div>
    )
  }
}

export default App;
