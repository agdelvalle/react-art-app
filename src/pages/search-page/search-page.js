import * as React from 'react';
import axios from 'axios';
import './search-page.css'
import { Header } from "../../domains/header/header";
import { ArtItem } from "../../domains/art/art-item/art-item";
import { Loader } from '../../components/loader/loader';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '../../components/button/btn';

export const SearchPage = () => {
    const [listings, setListings] = React.useState("");
    const [isLoading, setisLoading] = React.useState(true);
    const [isError, setisError] = React.useState(false);
    const location = useLocation()
    const { query } = location.state

    
    async function getWorks() {
        let promises = [];
        const fetchUrl = await axios.get(`https://api.artic.edu/api/v1/artworks/search?q=${query}`);

        let result = fetchUrl.data.data
        result.map((item) => promises.push(axios.get(item.api_link)))

        const artDetailResponses = await Promise.all(promises).catch(err => setisError(true));

        console.log(artDetailResponses)

        setListings(artDetailResponses)
        setisLoading(false)
    }
   
            
    React.useEffect(() => {
        getWorks()
    // eslint-disable-next-line
    }, [])

    return (
            <>
            <Header />
            <div className='results-banner'>
                <h1>Search Results - "{query}"</h1>
                <Link to="/"><Button mode="colorful" innerText="Back to home"/></Link>
            </div>
            <div className='result-container'>
                {isLoading? <Loader /> : null}
                {listings && listings.length > 1? listings.map((art) => (
                    <ArtItem 
                    title={art.data.data.title}
                    artist={art.data.data.artist_title}
                    url={`${art.data.config.iiif_url}/${art.data.data.image_id}/full/843,/0/default.jpg` || null}
                    date={art.data.data.date_display}
                    id={art.data.data.id}
                    key={art.data.data.id}
                    alt={art.data.data.title}
                />))
                : isLoading? null : <h2>No listings found, please try another search term</h2>}
                {isError ? <p>An error has occurred, please try again</p> : null}
            </div>
            </>
    );
    
}