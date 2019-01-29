import React, { Component } from 'react';
import './Login.css';
import { AuthenticatedUsers } from '../../AuthenticatedUsers'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { updateLoginStatus } from '../../store/actions'

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      userName: '',
      password: '',
      isError:false,
      errorMessage:'',
      errorHeader:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this);  
  }
  
/**
 * handle the submit form action
 * @param {*} e 
 */
  handleSubmit(e){
    e.preventDefault()
    AuthenticatedUsers.forEach( value => {
      if(value.userName === this.state.userName){
        if(value.password === this.state.password){
          this.props.updateLoginStatus(true, value.previlageUser, value.userName)
          this.props.history.push("/search")
        }else{
          this.setState({
            isError: true,
            errorMessage:'Try again with correct password',
            errorHeader: 'INCORRECT PASSWORD.'
          })
        }
      }else{
        this.setState({
          isError: true,
          errorMessage:'Try again with valid user',
          errorHeader: 'USER DOES NOT EXISTS.'
        })
      }
    })
    
  }
  /**
   * handle the user inputs 
   * @param {*} e 
   */
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value,
      isError: false,
      errorMessage:'',
      errorHeader: ''

    })
  }


  render() {
    return (
      <div>
        <form className="login-content"  onSubmit={this.handleSubmit}>
          <div className="container">
            {this.state.isError ? <div className="alert alert-danger alert-dismissible">
              <strong>{this.state.errorHeader}</strong> {this.state.errorMessage}.
            </div>: null}
            <h1 className="logoStyle"> MY UNIVERSE</h1>
            <i className="sloganStyle">login to explore ...</i>
            <label><b>Username</b></label>
            <input className="inputStyle" type="text" placeholder="Enter Username" value={this.state.userName} name="userName" onChange={this.handleChange} required/>

            <label><b>Password</b></label>
            <input className="inputStyle" type="password" placeholder="Enter Password" value={this.state.password} name="password" onChange={this.handleChange}   required/>
              
            <button type="submit">Login</button>
          </div>
        </form>
      </div> 
    );
  }
}

/**
 * dispatch event redux
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => {
  return {
    updateLoginStatus: (isLoggedIn, isPrevilageUser, userName) => dispatch(updateLoginStatus({isLoggedIn: isLoggedIn, isPrevilageUser: isPrevilageUser, userName: userName})),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Login));
