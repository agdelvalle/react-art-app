import * as React from 'react';
import './landing.css'
import { Header } from "../../domains/header/header";
import { ArtItem } from "../../domains/art/art-item/art-item"
import { Button } from '../../components/button/btn';
import { Loader } from '../../components/loader/loader';
// import { TextField } from '../../components/textfield/textfield';
// import { UseAuth } from '../../hooks/use-auth-state';
import { Link } from 'react-router-dom';
import { TextField } from '../../components/textfield/textfield';


export const Landing = () => {

    const [listings, setListings] = React.useState("");
    const [isLoading, setisLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [baseUrl, setBaseUrl] = React.useState("");
    const [searchValue, setSearchValue]  = React.useState("");

    let fetchUrl;


    const getPreviousPage = () => {
        if(page > 1){
            setPage(page-1);
            console.log(page)
         } 
    }
    
    const getNextPage = () => {
        if(page >= 1){
            setPage(page+1);
            console.log(page)
        }
    }

    fetchUrl = `https://api.artic.edu/api/v1/artworks?page=${page}&limit=4`
    
    const getWorks = () => 
        fetch(fetchUrl)
            .then((res) => res.json()) 
    
    const loadListings = (pageNum, signal) =>
        getWorks(signal).then((data) => {
            setisLoading(true)
            console.log(data.data)
            setBaseUrl(data.config.iiif_url)
            // console.log(imgBaseLink)
            setListings(data.data)
            setisLoading(false)
        })

    React.useEffect(() => {
        const ab = new AbortController();
        loadListings(page, ab.signal);
        return () => {
        ab.abort();
        };
    // eslint-disable-next-line
    }, [page])
    
    return( 
    <>
    <Header />
    <h1>Explore Art</h1>
    <div className='search-container'>
        <div>
        <TextField name="search" type="text" labeltext="Search for an artwork or artist:" onChange={(e)=>setSearchValue(e.target.value)}/>
        <Link to="/search" state={{query:searchValue}}><Button mode="colorful" className="viewbtn" innerText="Search" /></Link>
        </div>
    </div>
    <div className='art-container'>
        {isLoading? <p>loading...</p> : null}
        {listings && baseUrl? listings.map((art) => (
                <ArtItem 
                title={art.title}
                artist={art.artist_title}
                url={`${baseUrl}/${art.image_id}/full/843,/0/default.jpg` || null}
                date={art.date_display}
                id={art.id}
                key={art.id}
                alt={art.artist_title}
                />))
            : <Loader />}
        {listings? <div className='pageNavContainer'>
            {page > 1?
                <Button onClick={getPreviousPage} innerText="Previous" mode="navbtn"/> :
                <Button onClick={getPreviousPage} innerText="Previous" mode="navbtn" disabled />
            }
            <Button onClick={getNextPage} innerText="Next" mode="navbtn"/>
        </div> : null}
    </div>
    </>)}