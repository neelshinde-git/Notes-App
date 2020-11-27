import React, {useEffect}  from "react"
import {Button,Container, Row, Col} from "react-bootstrap"
import {connect} from "react-redux"
import {getNotes, updateTitle, updateBody} from "../redux/actions/notesActions"
import "../css/notes.css"


function Notes (props) {
    
    
    useEffect(()=>{
        
        let sid = localStorage.getItem('sid')
        let body = {"sid" : sid};
        let response = [];
        console.log("Getting Notes")
        console.log(body);
        props.getNotes(sid)
    }, [])
    
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        //if(checkValidity(name,value)){
            if(name==="title"){

                props.updateTitle(value);

            } else if(name==="body"){

                props.updateBody(value);

            }
        //}
        
    }
    
    const addNote = () => {
        if (props.title.length > 5 && props.body.length > 5){
            
            let sid = localStorage.getItem('sid')
            let body = {"sid" : sid, title: props.title, note: props.body};
            let response = "";
            console.log("Adding note: ")
            //console.log(body);

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
                } else {
                    console.log("Note addition failed");
                }
                }).catch(function(){
                    console.log("Note addition failed");
                });
            
        }
    }
    
    const showNote = (note) => {
        props.updateTitle(note.title);
        props.updateBody(note.note);
        
    }
    
    const deleteNote = (note) => {
        
        
        let sid = localStorage.getItem('sid')
        let body = {"sid" : sid, title: note.title, note: note.note};
        let response = "";
        console.log("Deleting note: ")
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
            } else {
                console.log("Note deletion failed");
            }
            }).catch(function(){
                console.log("Note deletion failed");
            });
        
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
                                        <span onClick={()=> showNote(note)}>{note.title}</span>
                                        <button onClick={()=> deleteNote(note)} className="delete-button">X</button>
                                    </div>
                                    
                                ))
                            }
                        </div>
                    </Col>
                    <Col xs={12} md={8} className="new-note-section">
                        <Button variant="dark" className="add-note" onClick={addNote}><b>+</b> Add Note</Button>
                        
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
      body: state.notes.note
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getNotes: (data) => dispatch(getNotes(data)),
      updateTitle: (data) => dispatch(updateTitle(data)),
      updateBody: (data) => dispatch(updateBody(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
