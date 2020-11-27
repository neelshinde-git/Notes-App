import React from "react"
import "../css/login.css"
import {Container, Button, Alert} from "react-bootstrap"
import { connect } from "react-redux"
import {updateUsername, updatePassword} from "../redux/actions/loginActions"

function Login(props){
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        //if(checkValidity(name,value)){
            if(name==="username"){

                props.updateUsername(value);

            } else if(name==="password"){

                props.updatePassword(value);

            }
        //}
        
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        var regex = /^([A-Za-z0-9]+)$/g;
        const isUsernameValid = regex.test(props.username);
        if(props.username.length > 4 && props.username.length <= 30 && props.password.length > 5 && props.password.length < 20 && isUsernameValid){
            
            //console.log("Form submitted with: " + props.username + " " + props.password)
            //tryLogin()
            
            var xhttp = new XMLHttpRequest();
            xhttp.open('POST', 'http://localhost:8000/auth', true);
            xhttp.setRequestHeader('Content-Type', 'application/xml');
            xhttp.setRequestHeader('Accept', 'application/notesapp');
            xhttp.setRequestHeader('Authorization', 'Basic ' + btoa(props.username+':'+ props.password));
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if(xhttp.readyState === XMLHttpRequest.DONE) {
                    var status = xhttp.status;
                    if (status === 0 || (status >= 200 && status < 400)) {
                      if(xhttp.responseText.length > 7){
                          console.log(xhttp.responseText)
                          localStorage.setItem('sid', xhttp.responseText);
                          window.location.reload(); // to refresh page so Notes page is loaded after checking session ID in local storage
                      } else {
                          console.log(xhttp.responseText);
                          alert("No such user!");
                      }
                    } else {
                      alert("Login attempt failed!");
                    }
                }
            }
            
        } else {
            //<Alert>Invalid Username or Password</Alert>
            alert("Invalid Username or Password. Try again...")
        }
    }
    
    
    return(
        <Container fluid>
            <h1 className="heading">ENCORA Notes</h1>
            <h3 className="subheading">World's leading note-keeping app</h3>
            <form>
                <img src="./media/quill.jpg" />
                <label>
                    Enter Username
                        <input 
                            type="text" 
                            name="username"
                            placeholder="Username"
                            maxlength="30"
                            pattern="[a-zA-Z0-9]+"
                            value={props.username}
                            onChange={handleChange}
                            />
                    </label>
                    <label>
                    Enter Password
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Password"
                            maxlength="20"
                            value={props.password}
                            onChange={handleChange}
                            />
                    </label>
                <Button type="submit" name="submit" variant="dark" className="submit-button" onClick={handleSubmit}>Login</Button>
            </form>
        </Container>
    )
    
}

const mapStateToProps = (state) => {
  return {
      username: state.login.username,
      password: state.login.password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      updateUsername: (data) => dispatch(updateUsername(data)),
      updatePassword: (data) => dispatch(updatePassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)