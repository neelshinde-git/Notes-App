/**********************************************************************

Title: Redux Store for the entire application
Desc: Everything related to store here.
Middleware used: Thunk
Reducer used is actually a combined reducer. 

***********************************************************************/

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from "redux-thunk"
import reducer from './reducer';


const store = createStore(reducer, applyMiddleware(ReduxThunk));


export default store;