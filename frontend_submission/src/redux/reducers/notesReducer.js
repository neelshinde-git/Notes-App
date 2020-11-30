/**********************************************************************

Title: Reducer for Login related state changes
Desc: Modify username and password input field for Login form is handled here. 
Handles all notes action related state changes

***********************************************************************/

import {UPDATE_TITLE, UPDATE_BODY, GET_NOTES} from "../actions/notesActions"

const notesData = {
    notes: [],
    title:"",
    note:"",
}

const notesReducer = (state = notesData, action) => {
    
    switch(action.type){
            
        case GET_NOTES:
            
            return{
                ...state, notes: action.payload,
            }
        case UPDATE_TITLE:
            return{
                ...state, title: action.payload
            }
        case UPDATE_BODY:
            return {
                ...state, note: action.payload
            }
            
            
        default: return state
    }
    
}

export default notesReducer