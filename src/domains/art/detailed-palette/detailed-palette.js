import React from "react";
import './detailed-palette.css'
import * as Vibrant from 'node-vibrant';

export const DetailedPalette = (props) => {
    function loadPalettes(){
        Vibrant.from(`${props.src}`).getPalette()
        .then((palette) => {
            console.log(palette)
            let artItem = document.getElementById(`palette-container`)
    
            let cDarkMuted = palette.DarkMuted._rgb
            let cDarkVibrant = palette.DarkVibrant._rgb
            let cLightMuted = palette.LightMuted._rgb
            let cLightVibrant = palette.LightVibrant._rgb
            let cMuted = palette.Muted._rgb
            let cVibrant = palette.Vibrant._rgb

            let hexDarkMuted = palette.DarkMuted.hex
            let hexDarkVibrant = palette.DarkVibrant.hex
            let hexLightMuted = palette.LightMuted.hex
            let hexLightVibrant = palette.LightVibrant.hex
            let hexMuted = palette.Muted.hex
            let hexVibrant = palette.Vibrant.hex
            
            // let colorDivs = ['DarkMuted', 'DarkVibrant', 'LightMuted', 'LightVibrant', 'Muted', 'Vibrant']
            // for(let color of colorDivs){
            //     let item = artItem.querySelector(`.${color}`)
            //     // console.log(cDarkMuted)
            //     let finalColor = '`${c' + {color} +'}`'
            //     item.style.backgroundColor = `rgb(${finalColor})`
            // }

            artItem.querySelector(`.DarkMuted`).innerHTML = `<h4>${hexDarkMuted}</h4>`
            artItem.querySelector(`.DarkVibrant`).innerHTML = `<h4>${hexDarkVibrant}</h4>`
            artItem.querySelector(`.LightMuted`).innerHTML = `<h4>${hexLightMuted}</h4>`
            artItem.querySelector(`.LightVibrant`).innerHTML = `<h4>${hexLightVibrant}</h4>`
            artItem.querySelector(`.Muted`).innerHTML = `<h4>${hexMuted}</h4>`
            artItem.querySelector(`.Vibrant`).innerHTML = `<h4>${hexVibrant}</h4>`
    
            artItem.querySelector(`.DarkMuted`).style.backgroundColor = `rgb(${cDarkMuted})`
            artItem.querySelector(`.DarkVibrant`).style.backgroundColor = `rgb(${cDarkVibrant})`
            artItem.querySelector(`.LightMuted`).style.backgroundColor = `rgb(${cLightMuted})`
            artItem.querySelector(`.LightVibrant`).style.backgroundColor = `rgb(${cLightVibrant})`
            artItem.querySelector(`.Muted`).style.backgroundColor = `rgb(${cMuted})`
            artItem.querySelector(`.Vibrant`).style.backgroundColor = `rgb(${cVibrant})`
    
        })
    }

    window.onload = loadPalettes();

    return (
        <div id="palette-container">
                <div className="large-color-sq DarkMuted">.</div>
                <div className="large-color-sq DarkVibrant">.</div>
                <div className="large-color-sq LightMuted">.</div>
                <div className="large-color-sq LightVibrant">.</div>
                <div className="large-color-sq Muted">.</div>
                <div className="large-color-sq Vibrant">.</div>
        </div>
    )
}