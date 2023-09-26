import { createContext, useContext, useEffect, useReducer } from "react";



const user = localStorage.getItem("user")

const INITIAL_STATE = {
    user : user ? JSON.parse(user) : null ,
    loading : false ,
    error : null
}




export const AuthContext = createContext(INITIAL_STATE)



const AuthReducer = (state , action) => {
    switch(action.type){
        case "LOGIN_START" :
            return {
                 user : null ,
                 loading : true ,
                 error : null
            }
        case "LOGIN_SUCCESS" : 
            return {
                user : action.payload ,
                error : null ,
                loading : false
            }
        case "LOGIN_FAILURE" : 
            return {
                user : null ,
                error : action.payload ,
                loading : false ,
            }
        case "LOGOUT" : 
            return {
                user : null ,
                error : null ,
                loading : false
            }

        default : return state            
    }
}




export const AuthContextProvider = ({children}) => {

    const [state , dispatch] = useReducer(AuthReducer  , INITIAL_STATE)


    useEffect(() => {
        localStorage.setItem("user" , JSON.stringify(state.user))
    } , [state.user])



    return(
        <AuthContext.Provider value={{user : state.user , loading : state.loading , error : state.error , dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}




export const useAuthContext = () => {
    return useContext(AuthContext)
}