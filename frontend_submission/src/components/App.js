import React, {useState, useEffect} from "react";
import Login from "./Login"
import Notes from "./Notes"
import "../css/app.css"


function App(){
    
    const [showNotes, setShowNotes]  = useState(false)
    const checkActiveUser = () => {
        var xhttp = new XMLHttpRequest();
        let sid = localStorage.getItem('sid')
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