import React from 'react';
import {connect} from 'react-redux'; 

import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase-utils'
import {ReactComponent as Logo } from '../../images/crown.svg';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {createStructuredSelector} from 'reselect';

import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
    <div className='options'>
        <Link className='option' to='/shop'>
            SHOP
        </Link>
        <Link className='option' to='/contacts'>
            CONTACTS
        </Link>
        {
            currentUser ? (
                <div className='option' onClick={() => auth.signOut()}>
                SIGN OUT
                </div>
            ) : ( 
                <Link className='option' to='/signIn'>
                  SIGN IN  
                </Link>
            )
        }
        <CartIcon />
    </div>
    {
        hidden ? null : <CartDropdown />
    }
    </div>
);

// const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
//     currentUser,
//     hidden
// });

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);