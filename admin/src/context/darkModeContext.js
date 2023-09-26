import { createContext, useContext, useReducer } from "react"
import DarkModeReducer from "./darkModeReducer"


const INITIAL_STATE = {
    darkMode : false
}


export const DarkModeContext = createContext(INITIAL_STATE)


export const DarkModeContextProvider = ({children}) => {

    const [state , dispatch] = useReducer(DarkModeReducer , INITIAL_STATE)

    return(
        <DarkModeContext.Provider value={{...state , dispatch}}>
            {children}
        </DarkModeContext.Provider>
    )

}


// custom hook
export const useDarkModeContext = () => {
    return useContext(DarkModeContext)
}