import * as React from 'react'

const AuthContext = React.createContext(undefined)

const storageKey = 'authToken'

const storedAccessToken = localStorage.getItem(storageKey)

const AUTH_DEFAULT_STATE = storedAccessToken ? 
{
    status: 'authenticated',
    accessToken: storedAccessToken,
} : 

{
    status: 'anonymous', 
    accessToken: '',
}

const authReducer = (prevState, event) => {
    switch(event.type){
        case 'login': 
            return {
                accessToken: event.token,
                status: 'authenticated'
            }
        case 'logout': 
            return {
                accessToken: '',
                status: 'anonymous'
            }

        default:
            throw new Error(`Unsupported event type ${event.type}`)
    }
}


export const UseAuthState = () => {
    const [state, dispatch] = React.useReducer(authReducer, AUTH_DEFAULT_STATE)

    return{
        token: state.accessToken,

        authStatus: state.status, 
        
        login: (authToken) => {
            dispatch({
                type: 'login',
                accessToken: authToken
            })
        },
        
        logout: () => {
            dispatch({
                type: 'logout'
            })

        }
    }
}

export const AuthProvider = ({children}) => {
    const auth = UseAuthState();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const UseAuth = () => {
    const auth = React.useContext(AuthContext)
    return auth;
}


async function LoginFunc(email, password) {
    console.log(email, password)
    return fetch('https://ecomm-new-jan22.herokuapp.com/login', {
        method: 'POST',
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: email,
            password
        })
    }).then(res => {
        if(res.ok){
            return res.json()
        }
        throw new Error(res.statusText)
    })
}

export const useLogin = () => {
    const { login } = UseAuth();
    return function(email, password){
        return LoginFunc(email, password).then((res) => {
            login(res.access_token)
            localStorage.setItem(storageKey, res.access_token)   
            console.log(localStorage) 
        })
    }
}

export const useLogout = () => {
    const auth = UseAuth();
    return function(){
        auth.logout()
        localStorage.removeItem(storageKey)  
        localStorage.removeItem("favorites")   
    }
}

// export const AddFavs = (id) => {
//     const { favorites } = UseAuth();
//     return function(id){
//         return favorites.push(id)
//     }
// }