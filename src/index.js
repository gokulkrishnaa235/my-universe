import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Search from './component/search/Search';
import Login from './component/login/Login'
import { Logout } from './component/others/Logout'
import { PageNotFound } from './component/others/PageNotFound'
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { searchReducer } from './store/reducer' 
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';



const store = createStore(searchReducer, applyMiddleware(thunk))

const Root = ({ store }) =>(
     <Provider store={store}>
      <BrowserRouter>
        <Switch>
            <PrivateRoute path="/search" component={Search} />
            <Route exact path="/"   component={Login} />
            <Route exact path="/login"  component={Login} />
            <Route  exact path="/logout" component={Logout} />
            <Route  exact component={PageNotFound} />

        </Switch>
      </BrowserRouter>
    </Provider>
)

function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          store.getState().isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  
  

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
