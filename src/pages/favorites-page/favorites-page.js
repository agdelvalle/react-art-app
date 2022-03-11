import * as React from 'react';
import { Loader } from '../../components/loader/loader';
import { Header } from "../../domains/header/header";
import { UseAuth } from '../../hooks/use-auth-state';
import { ArtItem } from "../../domains/art/art-item/art-item"
import { useFavsContext } from '../../hooks/use-favorites-state';
import './favorites-page.css'

export const FavoritesPage = () => {

    const { authStatus } = UseAuth();
    const { state: {favorites} } = useFavsContext();
    const [isLoading, setIsLoading] = React.useState(true);
    const [listings, setListings] = React.useState("");
    const [baseUrl, setBaseUrl] = React.useState("");

    let favoritesStr
    
    if(favorites.length > 0){
        favoritesStr = favorites.toString();
        console.log(favoritesStr)
    } else {
        favoritesStr = null;
    }
    
    let base = `https://api.artic.edu/api/v1/artworks?ids=${favoritesStr}&fields=id,title,image_id,date_display`;

    const getWorks = () => 
        fetch(base)
            .then((res) => res.json()) 
    
    const loadFavorites = (signal) => {
        if(favoritesStr != null){
            getWorks().then((data) => {
                setBaseUrl('https://www.artic.edu/iiif/2/')
                setListings(data.data)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        const ab = new AbortController();
        loadFavorites(ab.signal);
        return () => {
        ab.abort();
        };
    })
    

    return(
        <>
        <Header />
        <h1>Your Favorites</h1>
        <div className="favorites-container">
        { isLoading? <Loader /> : null }
        { authStatus === "authenticated" ? 
            !listings? 
                 null :
                 listings.map((favorite) => 
                <ArtItem
                title={favorite.title}
                artist={favorite.artist_title}
                url={`${baseUrl}/${favorite.image_id}/full/843,/0/default.jpg`}
                date={favorite.date_display}
                id={favorite.id}
                key={favorite.id}
                />)
        : <h1>Sorry, you must be logged in to view this page.</h1> }
        </div>
        </>
    )
}