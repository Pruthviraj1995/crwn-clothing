import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Contacts from './pages/contacts/contacts.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase-utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import {connect} from 'react-redux';
import CheckoutPage from './pages/checkout/checkout.component';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

// const App = (currentUser=null ) => {
class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    // const {setCurrentUser} = this.props;
    const {setCurrentUser, collectionsArray} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // createUserProfileDocument(user);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser ({
              id: snapshot.id,
              ...snapshot.data()
            })
          });
      }
      setCurrentUser(userAuth);
      addCollectionAndDocuments('collections', 
      collectionsArray.map(({title, items}) => ({ title, items }) ));

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/Shop' component={ShopPage} />
          <Route path='/contacts' component={Contacts} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' 
          render= {() => this.props.currentUser? 
          (<Redirect to='/' />) : 
          (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = ({user}) =>({
//   currentUser: user.currentUser
// });

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);