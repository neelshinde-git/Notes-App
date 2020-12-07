/**********************************************************************

Title: Notes component.
Desc: Checks if users is signed in using the "sid" which represents Session token/id in the LocalStorage.
Addition, Viewing, Deletion, listing of all notes for the signed in user is handled by this component. 
This component only loads if the user is already signed in else it won't be visible. 

***********************************************************************/

import React, {useEffect}  from "react"
import {Button,Container, Row, Col} from "react-bootstrap"
import {connect} from "react-redux"
import {getNotes, updateTitle, updateBody, updateNoteid} from "../redux/actions/notesActions"
import "../css/notes.css"


function Notes (props) {
    
    /**********************************************************************
    
    Function useEffect() - uses "sid" i.e. Session token from Local Storage and gets all the notes associated to that user.
    getNotes() function from props is used for fetching the notes from backend.
    
    ***********************************************************************/
    useEffect(()=>{
        
        let sid = localStorage.getItem('sid')
        let body = {"sid" : sid};
        let response = [];
        console.log("Getting Notes")
        console.log(body);
        props.getNotes(sid)
    }, [])
    
    /**********************************************************************
    
    Function handleChange() - for tracking all Title and Body changes in the input field.
    State is updated accordingly 
    
    ***********************************************************************/
    const handleChange = (event) => {
        const {name, value} = event.target;
            if(name==="title"){

                props.updateTitle(value);

            } else if(name==="body"){

                props.updateBody(value);

            }        
    }
    
    /**********************************************************************
    
    Function addNote() - used for Adding a note
    Values from note's input field are present in the state. 
    These values are added to the database corresponding to the logged in user. 
    Session id, title and body are the requirements. 
    
    ***********************************************************************/
    const addNote = () => {
        
        if (props.title.length > 5 && props.body.length > 5){
            
            let sid = localStorage.getItem('sid')
            let body = {"sid" : sid, title: props.title, note: props.body, noteid: props.noteid};
            let response = "";
            console.log("Adding note ");
            console.log(body);
            const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                }
            fetch('http://localhost:8000/add', requestOptions)
            .then(response => response.text())
            .then(text => {
                if(text == "success"){
                    props.getNotes(sid);
                    props.updateTitle("");
                    props.updateBody("");
                    props.updateNoteid(undefined);
                } else {
                    console.log("Note addition failed");
                }
                }).catch(function(){
                    console.log("Note addition failed");
                });    
        }
    }
    
    /**********************************************************************
    
    Function showNote() - used to see title and body of a note
    Clicking on a note from the List of notes on the left populates its title and body in the input fields.
    
    ***********************************************************************/
    const showNote = (note) => {
        
        props.updateTitle(note.title);
        props.updateBody(note.note);
        props.updateNoteid(note.noteid);
        
    }
    
    /**********************************************************************
    
    Function deleteNote() - used for Deleting a note
    Clicking on the "X" i.e. close button of a note from the notes list on the left side deletes that note.
    Based on the Session id, title and body of the selected note, that particular note is deleted permanently
    Possible optimization: On click handler can be attached on the container div instead and target can be checked (was skipped due to time constraints).
    
    ***********************************************************************/
    const deleteNote = (note) => {
        
        let sid = localStorage.getItem('sid');
        let body = {"sid" : sid, title: note.title, noteid: note.noteid};
        let response = "";
        console.log("Deleting note: ");
        console.log(body);

        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }
        fetch('http://localhost:8000/delete', requestOptions)
        .then(response => response.text())
        .then(text => {
            if(text == "success"){
                props.getNotes(sid);
                if(body.noteid === props.noteid){
                    props.updateNoteid(undefined);
                }
            } else {
                console.log("Note deletion failed");
            }
            }).catch(function(){
                console.log("Note deletion failed");
            });
    }
    
    
    /**********************************************************************
    
    Function clearSelection() - used for Clearing form fields for selected note so new note can be added
    Clicking on it will let you fill the form fields for a new note in ccase there is a previously selected note;
    
    ***********************************************************************/
    const clearSelection = () => {
        
        props.updateNoteid(undefined);
        props.updateBody("");
        props.updateTitle("");
        console.log("Cleared selection");
        
    }
    
    return(
        <div className="notes-container">
            <h3>ENCORA Notes</h3>
            <Container fluid>
                <Row>
                    <Col xs={0} md={4} className="note-list-section">
                        <div className="list-container">
                            {
                                props.notes.map((note, key) => (
                                    <div className="notes-list">
                                        <span className="side-note" onClick={()=> showNote(note)}>{note.title}</span>
                                        <button onClick={()=> deleteNote(note)} className="delete-button">X</button>
                                    </div>
                                    
                                ))
                            }
                        </div>
                    </Col>
                    <Col xs={12} md={8} className="new-note-section">
                        <div className="top-button-container">
                            <Button variant="dark" className="add-note" onClick={addNote}><b>+</b> Add/Update Note</Button>
                            <Button variant="dark" className="clear-note" onClick={clearSelection}><b>&#8634;</b></Button>  
                        </div>
                        
                        <label>
                            <b>Title:</b>
                            <input 
                                type="text" 
                                name="title"
                                placeholder="Enter Title"
                                value={props.title}
                                onChange={handleChange}
                                />
                        </label>
                        <label>
                            <b>Body:</b> 
                            <textarea 
                                type="text" 
                                name="body"
                                placeholder="Add Note Body"
                                value={props.body}
                                onChange={handleChange}
                                />
                    </label>
                    </Col>
                </Row>
            </Container>
        
        </div>
    )
    
    
}


const mapStateToProps = (state) => {
  return {
      notes: state.notes.notes,
      title: state.notes.title,
      body: state.notes.note,
      noteid: state.notes.noteid,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getNotes: (data) => dispatch(getNotes(data)),
      updateTitle: (data) => dispatch(updateTitle(data)),
      updateBody: (data) => dispatch(updateBody(data)),
      updateNoteid: (data) => dispatch(updateNoteid(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
