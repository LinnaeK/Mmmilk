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
      country:[]
    }
  }

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
