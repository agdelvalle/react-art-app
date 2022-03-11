import * as React from 'react';
import './search-page.css'
import { Header } from "../../domains/header/header";
// import { ArtItem } from "../../domains/art/art-item/art-item";
import { Button } from '../../components/button/btn';
import { Loader } from '../../components/loader/loader';
import { useLocation, Link } from 'react-router-dom';

export const SearchPage = () => {
    const [listings, setListings] = React.useState("");
    const [isLoading, setisLoading] = React.useState(false);
    // const [page, setPage] = React.useState(1);
    // const [baseUrl, setBaseUrl] = React.useState("");

    const location = useLocation()
    const { query } = location.state

    let fetchUrl;
    fetchUrl = `https://api.artic.edu/api/v1/artworks/search?q=${query}`

    const getWorks = () => 
        fetch(fetchUrl)
            .then((res) => res.json()) 
    
    let finalSourceData = [];
            
    const loadListings = (signal) => {
        let sourceData;
        let dataSet = [];
        getWorks(signal).then((data) => {
            setisLoading(true)
            console.log(data.data)
            sourceData = data.data;
            sourceData.forEach((item) => dataSet.push(item.api_link))
            console.log(dataSet)
            dataSet.map((link) => fetch(link).then((res) => res.json()).then((data) => {
                let artInfo = {
                    title: data.data.title, 
                    artist: data.data.artist_title,
                    img: data.data.image_id,
                    date: data.data.date_display,
                    id: data.data.id,
                    key: data.data.id
                }
                finalSourceData.push(artInfo)
                // console.log(artInfo)
            }))
            finalSourceData.map((item) => console.log("in final source is: " + item))
        }).then(() => {
            // console.log("ffff" + JSON.stringify(sourceData[0]))
            console.log(finalSourceData)
            setisLoading(false)
            setListings(sourceData)}
        )
    }

    React.useEffect(() => {
        const ab = new AbortController();
        loadListings(ab.signal);
        return () => {
        ab.abort();
        };
    // eslint-disable-next-line
    }, [])

    
    return (
        <>
        <Header />
        <h1>Search Results - "{query}"</h1>
        <div className='result-container'>
            {isLoading? <Loader /> : null}
            {listings? listings.map((art) => (
                <div className='search-result' key={art.id}>
                    <h4>{art.title}</h4>
                    <h5>{art.artist}</h5>
                    <Link to="/viewWork" state={{id:art.id}}><Button mode="colorful" className="viewbtn" innerText="View Details" /></Link>
                </div>
            ))
            : <p>no listings</p>}
        </div>
        </>
    )
}