import * as React from 'react';
import { Header } from "../../domains/header/header";
import { DetailedArtItem } from "../../domains/art/detailed-art-item/detailed-art-item";
import { Loader } from "../../components/loader/loader";
import { useLocation } from 'react-router-dom'

export const ArtPage = (props) => {

    const [artInfo, setArtInfo] = React.useState("");
    const [isLoading, setisLoading] = React.useState(true)
    const [baseUrl, setBaseUrl] = React.useState("");
    const [status, setStatus] = React.useState("");

    const location = useLocation()
    const { id } = location.state

    const getArt = (id) => 
    fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
    .then((res) => 
        res.json())
    .catch(() => setStatus("Error"))

    const loadItem = (id, signal) => getArt(id).then((data) =>{
        setisLoading(true)
        console.log(data)
        setArtInfo(data.data)
        setBaseUrl(data.config.iiif_url)
        setisLoading(false)
    })

    React.useEffect(() => {
        const ab = new AbortController();
        loadItem(id, ab.signal);
        return () => {
        ab.abort();
        };
    // eslint-disable-next-line
    }, [id])

    return(
        <>
        <Header />
        {isLoading ?
        <Loader /> : 
            status === 'Error' ? <p>An error has occurred, please return to home</p> 
            : null
        }
        {artInfo ?
            <DetailedArtItem  
                src={`${baseUrl}/${artInfo.image_id}/full/843,/0/default.jpg`}
                title={artInfo.title}
                date={artInfo.date_end}
                artist ={artInfo.artist_title}
                style={artInfo.style_title}
                dept={artInfo.department_title}
                desc={artInfo.medium_display}
                id={id}
            /> : null}
        </>
    )
}