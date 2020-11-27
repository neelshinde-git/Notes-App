export const MODIFY_USER = "MODIFY_USER" 
export const MODIFY_PASS = "MODIFY_PASS" 
export const SUBMIT = "SUBMIT" 

export const updateUsername = (username) => {
    return {
        type: MODIFY_USER,
        payload: username
    }
    
}

export const updatePassword = (password) => {
    return {
        type: MODIFY_PASS,
        payload: password
    }
    
}