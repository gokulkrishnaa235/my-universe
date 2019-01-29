import React, { Component } from 'react';
import './Search.css';
import { SearchResult } from './SearchResult'
import { ShowDetails } from './ShowDetails'
import { connect } from 'react-redux'
import { doSearch, getDetails, clearSearch, updateLoginStatus } from '../../store/actions'
import { Header } from '../header/Header';
import { withRouter } from "react-router";



class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
        searchData:[],
        details: {},
        searchValue:"",
        Timer: 60,
        NumberOfRequest:15,
        showModal: false
    }
   this.handleSearch = this.handleSearch.bind(this)
   this.showDetails = this.showDetails.bind(this)
   this.signout = this.signout.bind(this)
  }


componentDidMount () {
    this.startCounter();
}



/**
 * To maintain the rate limit for non-previlage user
 */
startCounter(){
    setInterval(()=> {
    if(this.state.Timer !== 0){
        this.setState({
            Timer: this.state.Timer - 1
        })
    }else{
        this.setState({
            Timer: 60,
            NumberOfRequest:15,
            showModal: false
        })
    }
    }, 1000)
}

/**
 * handleSearch used to handle user search operation
 * @param {*} e 
 */
handleSearch (e){
    if(e.target.value) {
        if(this.state.NumberOfRequest !==0 || this.props.isPrevilageUser){
        this.setState({
            searchValue: e.target.value,
            isloader: true,
            NumberOfRequest: this.state.NumberOfRequest - 1,
            showModal: false
            })
            this.props.doSearch(e.target.value)
        }else {
            this.setState({
            showModal: true
            })

        }   
    }else{
        this.setState({
            searchValue: e.target.value
            })
        this.props.clearSearch() 
    }
}

componentWillReceiveProps(nextProps){   
    this.setState({
        searchData: nextProps.result,
        details: nextProps.planetDetails
    })
}


/**
 * show the detail card data
 * @param {*} url 
 */
showDetails(url){
    this.props.clearSearch()  
    this.props.showDetails(url)
    this.setState({
        searchValue: ""
    })
}
/**
 * used to sign out the user
 */
signout(){
    this.props.updateLoginStatus();
    this.props.history.push("/logout")
}



render() {
    let renderList = null
    if(this.state.searchData.length > 0){
        renderList = this.state.searchData.map((value, index) => {
        return <SearchResult  population={value.population} showData={this.showDetails} showDetailsUrl={value.url} key={index} searchData={value} />   
        })
    }

    let showModal = null
    if(this.state.showModal) {
        showModal =  <div class="modal">
        <div class="modal-content">
            <div class="modal-body">
              {`You Can't do any search for next ${this.state.Timer} seconds`}
            </div>  
        </div>
    </div>
    }
    return (
        <div className="search-container">    
            <Header signout={this.signout}/>
            {showModal}
           {this.props.isPrevilageUser?<div className="userInfoContainer"><b> Hi {this.props.userName},</b> <br/> <i>You are previlage user ! ,</i> <br/> you can do more than 15 search in a minute  </div> : 
            <div className="userInfoContainer"> <b> Hi {this.props.userName},</b> <br/> <i>You are not previlage user ! ,</i> <br/>{`You do only ${this.state.NumberOfRequest} in next ${this.state.Timer} seconds`} </div> } 
            <input  className="searchInputStyle" disable={this.state.disabled} type="text" placeholder="Search your planet here ..."  value={this.state.searchValue} name="searchData" onChange={this.handleSearch} />
            <div> 
               {renderList}
            </div>
            {this.state.details.name && !this.state.searchValue  ? <ShowDetails displayData={this.state.details}/>: this.state.searchData.length === 0 ? <h1 className="noDataStyle">loading data...</h1> : null}     
        </div>
    );
  }
}
/**
 * to set updated props to state
 * @param {*} state 
 */
const mapStateToProps = state => {
    return {
      result: state.searchResult,
      planetDetails: state.Details,
      isPrevilageUser: state.isPrevilageUSer,
      userName: state.userName

    }
  }
  
 
/**
 * dispatch action to store
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => {
    return {
        doSearch: (payload) => dispatch(doSearch(payload)),
        showDetails: (payload) => dispatch(getDetails(payload)),
        clearSearch: () => dispatch(clearSearch()),
        updateLoginStatus: () => dispatch(updateLoginStatus({isLoggedIn: false, isPrevilageUser: false, userName: ''})),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
