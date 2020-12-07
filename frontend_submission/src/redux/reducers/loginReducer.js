/**********************************************************************

Title: Reducer for Login related state changes
Desc: Modify username and password input field for Login form is handled here. 
Handles all login action related state changes

***********************************************************************/

import {MODIFY_USER, MODIFY_PASS, SUBMIT} from "../actions/loginActions"

const formData = {
    username: "Username",
    password: "Password"
}

const loginReducer = (state = formData, action) => {
    
    switch(action.type){
        case MODIFY_USER:
            
            return {
                ...state, username: action.payload
            }
        case MODIFY_PASS:
            return{
                ...state, password: action.payload
            }
        default: return state
    }
    
}

export default loginReducer