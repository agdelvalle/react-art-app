import React from "react";
import * as Vibrant from 'node-vibrant';
import './art-item.css'
import { Button } from "../../../components/button/btn";
import { UseAuth } from '../../../hooks/use-auth-state';
import { useFavsContext } from '../../../hooks/use-favorites-state';

import { Link } from 'react-router-dom';


export const ArtItem = (props) => {

    // const [favorite, setFavorite] = React.useState(false)
    
    const { authStatus } = UseAuth();
    const { state: {favorites}, dispatch } = useFavsContext();
    // console.log(favorites)

    function loadPalettes(){
        Vibrant.from(`${props.url}`).getPalette()
        .then((palette) => {
            let artItem = document.getElementById(`${props.id}`)

            let cDarkMuted = palette.DarkMuted._rgb
            let cDarkVibrant = palette.DarkVibrant._rgb
            let cLightMuted = palette.LightMuted._rgb
            let cLightVibrant = palette.LightVibrant._rgb
            let cMuted = palette.Muted._rgb
            let cVibrant = palette.Vibrant._rgb
            
            // let colorDivs = ['DarkMuted', 'DarkVibrant', 'LightMuted', 'LightVibrant', 'Muted', 'Vibrant']
            // for(let color of colorDivs){
            //     let item = artItem.querySelector(`.${color}`)
            //     // console.log(cDarkMuted)
            //     let finalColor = '`${c' + {color} +'}`'
            //     item.style.backgroundColor = `rgb(${finalColor})`
            // }

            artItem.querySelector(`.DarkMuted`).style.backgroundColor = `rgb(${cDarkMuted})`
            artItem.querySelector(`.DarkVibrant`).style.backgroundColor = `rgb(${cDarkVibrant})`
            artItem.querySelector(`.LightMuted`).style.backgroundColor = `rgb(${cLightMuted})`
            artItem.querySelector(`.LightVibrant`).style.backgroundColor = `rgb(${cLightVibrant})`
            artItem.querySelector(`.Muted`).style.backgroundColor = `rgb(${cMuted})`
            artItem.querySelector(`.Vibrant`).style.backgroundColor = `rgb(${cVibrant})`

        })
    }

    return (
    <>
        <div className="art-card" id={props.id} onLoad={()=> loadPalettes()}>
            <img src={props.url} alt={props.alt}></img>
            <h4>"{props.title}"</h4>
            <b><p>{props.artist}</p></b><p>{props.date}</p>
            <div className="swatch-container">
                <div className="color-sq DarkMuted"> </div>
                <div className="color-sq DarkVibrant"> </div>
                <div className="color-sq LightMuted"> </div>
                <div className="color-sq LightVibrant"> </div>
                <div className="color-sq Muted"> </div>
                <div className="color-sq Vibrant"> </div>
            </div>
            <div className="btns-container">
            {authStatus === 'anonymous' ? 
            null :
                Array.isArray(favorites) && favorites.includes(`${props.id}`) ?
                // favorites.some((id)=>id===props.id) ? 
                    <Button innerText={<span className="glyphicon glyphicon-heart" aria-hidden="true"></span>}
                    mode="liked"
                    onClick = {() => {
                        dispatch({type:'removeFav', payload:(`${props.id}`)})
                        // let getFavorites = localStorage.getItem("favorites");
                        // if(getFavorites === null){
                        //     console.log(getFavorites)
                        // } else {
                        //     let getFavoritesJson = JSON.parse(getFavorites)
                        //     let indexOfItem = getFavoritesJson.indexOf(`${props.id}`)
                        //     getFavoritesJson.splice(indexOfItem, 1);
                        //     localStorage.setItem("favorites", JSON.stringify(getFavoritesJson));
                        //     console.log(getFavorites)
                        //     setFavorite(false);
                        //     console.log("remove from favorites") 
                        // }
                    }}
                    />
                : <Button innerText={<span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>}
                    mode="primary"
                    onClick = {() => {
                        dispatch({type:'addFav', payload:(`${props.id}`)})
                        console.log("current global favorites are" + favorites)
                        // let getFavorites = localStorage.getItem("favorites");
                        // if(getFavorites === null){
                        //     localStorage.setItem("favorites", JSON.stringify([`${props.id}`]));
                        //     console.log(getFavorites)
                        // } else {
                        //     let getFavoritesJson = JSON.parse(getFavorites)
                        //     getFavoritesJson.push(JSON.stringify(props.id));
                        //     localStorage.setItem("favorites", JSON.stringify(getFavoritesJson));
                        //     console.log(getFavorites)
                        // }
                        // setFavorite(true); 
                }}
                />
            }
            <Link to="/viewWork" state={{id:props.id}}><Button mode="colorful" className="viewbtn" innerText="View Details" /></Link>

            </div>
        </div> 
    </>
    )}