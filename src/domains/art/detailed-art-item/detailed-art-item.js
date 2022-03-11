import React from "react";
import './detailed-art-item.css';
import { DetailedPalette } from "../detailed-palette/detailed-palette";
import { UseAuth } from "../../../hooks/use-auth-state"
import { useFavsContext } from '../../../hooks/use-favorites-state';
import { Button } from "../../../components/button/btn";


export const DetailedArtItem = (props) => {

    const { authStatus } = UseAuth();
    const { state: {favorites}, dispatch } = useFavsContext();
    
    return (
            <div className="details-container">
                <img src={props.src} alt={props.alt} />
                <div className="details-text-container">
                    <div className="details-text">
                        <h2>{props.title}</h2>
                        <h3>{props.artist}</h3>
                        <h3>{props.date}</h3>
                        <h4>{props.dept}, {props.style}</h4>
                        <h4>{props.desc}</h4>
                        <br />
                    </div>
                    {authStatus === 'anonymous' ? 
                        null :
                            Array.isArray(favorites) && favorites.includes(`${props.id}`) ? 
                                <Button innerText={<span className="glyphicon glyphicon-heart" aria-hidden="true"></span>}
                                mode="liked"
                                onClick = {() => {
                                    dispatch({type:'removeFav', payload:(`${props.id}`)})
                                }}
                                />
                            : <Button innerText={<span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>}
                                mode="primary"
                                onClick = {() => {
                                    dispatch({type:'addFav', payload:(`${props.id}`)})
                                    console.log("current global favorites are" + favorites)
                            }} />
                    }
                    <div className="palette">
                        <h3>Palette: </h3>
                        <DetailedPalette 
                        src={props.src}
                        />
                    </div>    
                </div>
            </div>
    )

}