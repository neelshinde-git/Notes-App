import {MODIFY_USER, MODIFY_PASS, SUBMIT} from "../actions/loginActions"

const formData = {
    username: "ABCDEFG",
    password: "LALALALA"
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