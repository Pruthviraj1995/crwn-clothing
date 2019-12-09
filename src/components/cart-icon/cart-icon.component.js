import React from 'react';
import { connect } from 'react-redux';

import {toggleCartHidden}  from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect';
import {ReactComponent as ShoppingIcon} from '../../images/shopping-bag.svg';
import './cart-icon.styles.scss';
    
const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
);

// const mapStateToProps = ({ cart: {cartItems}}) => ({
//     itemCount: cartItems.reduce(
//         (accumulatedQuantity, CartItem) => accumulatedQuantity + CartItem.quantity, 0
//     )
// })

// const mapStateToProps = state => ({
//     itemCount: selectCartItemsCount(state)
// })

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})


const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);