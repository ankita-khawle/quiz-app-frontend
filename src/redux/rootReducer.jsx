import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import screenOptionsReducer from './screenoptions/screenOptionsReducer'


const appReducer = combineReducers({
    userReducer: userReducer,
    screenOptionsReducer: screenOptionsReducer
});

const rootReducer = (state,action) => {
    return appReducer(state,action)
}
export default rootReducer;