import * as React from 'react'

const FavoritesContext = React.createContext(undefined)

const favStorageKey = 'authToken'

const storedAccessToken = localStorage.getItem(favStorageKey)

const FAVS_DEFAULT_STATE = storedAccessToken ? 
{
    favorites: [],
} : 

{
    favorites: '',
}

export const FavsProvider = ({children}) => {
    const favsReducer = (state, event) => {
        switch(event.type){
            case 'addFav': 
                return {
                    favorites:[...state.favorites, event.payload],
                }
            case 'removeFav': 
                return {
                    favorites: [...state.favorites.filter(f=>f!==event.payload)],
                }

            default:
                throw new Error(`Unsupported event type ${event.type}`)
        }

    }

    const [state, dispatch] = React.useReducer(favsReducer, FAVS_DEFAULT_STATE)
    return <FavoritesContext.Provider value={{state, dispatch}}>{children}</FavoritesContext.Provider>
}

export const useFavsContext = () =>{
    return React.useContext(FavoritesContext)
}