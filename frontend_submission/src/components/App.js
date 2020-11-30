/**********************************************************************

Title: App component also the main component that calls other components.
Desc: Checks if user is signed in upon loading and loads either Login form component or Notes component with data related to the signed in user.

***********************************************************************/

import React, {useState, useEffect} from "react";
import Login from "./Login"
import Notes from "./Notes"
import "../css/app.css"


function App(){
    
    const [showNotes, setShowNotes]  = useState(false);
    
    /**********************************************************************
    
    Function checkActiveUser() - checks if user is already signed in and changes state based on the backend response.
    Which component loaded depends on this. 
    
    ***********************************************************************/
    const checkActiveUser = () => {
        var xhttp = new XMLHttpRequest();
        let sid = localStorage.getItem('sid');
        let body = {"sid" : sid};
        console.log(body);
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({sid: sid})
            }
        fetch('http://localhost:8000/check', requestOptions)
        .then(response => response.text())
        .then(text => {
            if(text === "success"){
                console.log("Logged in")
                setShowNotes(true);
            } else {
                console.log("Not signed in");
            }
            }).catch(function(){
                console.log("Fetching err");
            });          
    }
    
    /**********************************************************************
    
    Function useEffect() - used as ComponentDidMount
    checkActiveUser() function is called from here to verify is there is any session is active
    Which component will mount depends on the result of this. 
    
    ***********************************************************************/
    useEffect(()=>{
        checkActiveUser()
    },[])
    
    
    return(
        <>
        {showNotes ? <Notes /> : <Login />}
        </>
    )
    
}

export default App