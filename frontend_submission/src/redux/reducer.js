import { combineReducers } from 'redux';
import loginReducer from './reducers/loginReducer';
import notesReducer from './reducers/notesReducer';


const reducer = combineReducers({

    login: loginReducer,
    notes: notesReducer

});

export default reducer;