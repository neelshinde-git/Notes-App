/**********************************************************************

Title: All Note actions defined here for Notes Reducer.
Desc: Getting all notes related to user, updating Title and Body is handled here for the Notes component

***********************************************************************/

export const GET_NOTES = "GET_NOTES" 
export const UPDATE_TITLE = "UPDATE_TITLE"
export const UPDATE_BODY = "UPDATE_BODY"
export const UPDATE_NOTEID = "UPDATE_NOTEID"

/**********************************************************************
    
Function getNotes() - get List of notes for signed in user
Session id sent with fetch call which check if the session id is active/valid and returns list of notes. 
Uses Middleware - Thunk

***********************************************************************/
export const getNotes = (sid) => {
    
    return function(dispatch){
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({sid: sid})
            }
        fetch('http://localhost:8000/notes', requestOptions)
        .then(response => response.text())
        .then(data => {
            try {
                const notes = JSON.parse(data);
                console.log(notes);
                if(notes.length > 0){
                    console.log("Logged in for Notes  " + notes.length);
                    dispatch(getNotesSuccess(notes));

                } else {
                    console.log("Not signed in");
                }
                
            } catch (err){
                console.log("No notes for this user");
                const notes = [];
                console.log(notes);
                dispatch(getNotesSuccess(notes));
            }
            
            }).catch(function(){
                console.log("Fetching err");
            });
    }
    
}

/**********************************************************************
    
Function getNotesSuccess() - used for updating state after successful retrieval of notes from backend
getNotes() calls this conditionally.

***********************************************************************/
const getNotesSuccess = (data) => {
    
    return {
        type: GET_NOTES,
        payload: data
    }
    
}


/**********************************************************************
    
Function updateTitle() - update Title based on input

***********************************************************************/
export const updateTitle = (data) => {
    return {
        type: UPDATE_TITLE,
        payload: data
    }
    
}

/**********************************************************************
    
Function updateBody() - update Body based on input

***********************************************************************/
export const updateBody = (data) => {
    return {
        type: UPDATE_BODY,
        payload: data
    }
    
}

/**********************************************************************
    
Function updateNoteid() - updates Noteid for selected note, value for new note is undefined

***********************************************************************/
export const updateNoteid = (data) => {
    return {
        type: UPDATE_NOTEID,
        payload: data
    }
    
}