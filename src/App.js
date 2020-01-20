import React, { Component } from 'react';
import './App.css'
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
      multiple: false,
      countryMessage: "(select one)",
      age:[],
      isEnabled:true,
      ageMessage:"(select up to three)",
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
    this.setState({
      comparisonByItem:e.target.value,
      age:[],
      country:[],
      isEnabled:true,
      twelveToFifteen: false,
      twelveToTwentyThree: false,
      twentyToTwentyThree: false,
      zeroToTwentyThree: false,
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
      zeroToTwentyThree: false,
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
            countryMessage={this.state.countryMessage} 
            ageMessage={this.state.ageMessage} 
            isEnabled={this.state.isEnabled}
            handleResetClick={this.handleResetClick}
            handleLogout={this.handleLogout} 
            handleRadioClick={this.handleRadioClick}
            handleCountryClick={this.handleCountryClick}
            handleAgeClick={this.handleAgeClick}
            handleChange={this.handleChange}
            handleChangeMultiple={this.handleChangeMultiple}
            twelveToFifteen={this.state.twelveToFifteen}
            twelveToTwentyThree={this.state.twelveToTwentyThree}
            twentyToTwentyThree={this.state.twentyToTwentyThree}
            zeroToTwentyThree={this.state.zeroToTwentyThree}
            eZeroToFive={this.state.eZeroToFive}
            pZeroToFive={this.state.pZeroToFive}
            multiple={this.state.multiple}
            country={this.state.country}
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
