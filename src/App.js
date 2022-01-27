import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignUp from './pages/signin-signup/signin-signup.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component.jsx';

import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';

import { setCurrentUser } from './redux/user/user.actions.js';
import { selectCurrentUser } from './redux/user/user.selectors.js';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //this.setState({ currentUser: user }); createUserProfileDocument(user);
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
           setCurrentUser( {
              id: snapShot.id,
              ...snapShot.data()
            })
          //console.log(this.state)
        })
      }else{
        setCurrentUser(userAuth) //userAuth is null
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' 
                  render={()=>
                    this.props.currentUser ? (
                    <Redirect to='/' />
                    ) : (
                    <SignInAndSignUp />
                    )
                  }
                  />   
        </Switch>
      </div>
    );
  }

}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
