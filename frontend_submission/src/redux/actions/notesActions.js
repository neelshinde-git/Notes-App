export const GET_NOTES = "GET_NOTES" 
export const ADD_NOTE = "ADD_NOTE" 
export const DELETE_NOTE = "DELETE_NOTE"
export const UPDATE_TITLE = "UPDATE_TITLE"
export const UPDATE_BODY = "UPDATE_BODY"


export const getNotes = (sid) => {
    return function(dispatch){
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({sid: sid})
            }
        fetch('http://localhost:8000/notes', requestOptions)
        .then(response => response.json())
        .then(notes => {
            console.log(notes);
            if(notes.length > 0){
                console.log("Logged in for Notes  " + notes.length);
                dispatch(getNotesSuccess(notes));
               
            } else {
                console.log("Not signed in");
            }
            }).catch(function(){
                console.log("Fetching err");
            });
    }
    
}

const getNotesSuccess = (data) => {
    
    return {
        type: GET_NOTES,
        payload: data
    }
    
}

export const updateTitle = (data) => {
    return {
        type: UPDATE_TITLE,
        payload: data
    }
    
}

export const updateBody = (data) => {
    return {
        type: UPDATE_BODY,
        payload: data
    }
    
}