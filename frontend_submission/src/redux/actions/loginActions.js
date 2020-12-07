/**********************************************************************

Title: All Login actions defined here for Login Reducer.
Desc: Modify username and password input field for Login form is handled here. 

***********************************************************************/

export const MODIFY_USER = "MODIFY_USER" 
export const MODIFY_PASS = "MODIFY_PASS" 
export const SUBMIT = "SUBMIT" 


/**********************************************************************
    
Function updateUsername() - update username based on input

***********************************************************************/
export const updateUsername = (username) => {
    return {
        type: MODIFY_USER,
        payload: username
    }
    
}

/**********************************************************************
    
Function updatePassword() - update password based on input

***********************************************************************/
export const updatePassword = (password) => {
    return {
        type: MODIFY_PASS,
        payload: password
    }
    
}