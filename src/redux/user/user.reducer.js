import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.SET_CURRENT_STATE:
            return{
                ...state,
                currentUser: action.payload
            }


        default:
            return action;
    }
}

export default userReducer;