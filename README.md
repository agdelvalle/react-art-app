# Artists' Palette

## About

Artists' Palette is designed to show you the colors used in some of the world's most famous artworks, from public data shared by the Art Institute of Chicago. You can browse through the museum's collection, search for an artwork of your choice, view details about the artworks (including the hex codes for the colors used in the work), and even save your favorites. 

## Setup

There is no setup necessary, simply view the site live <a href="https://wonderful-shockley-5cdf93.netlify.app/">here.</a> 

## FAQs

### What technologies were used to make the app? 
The app was created using React JS and the <a href="https://api.artic.edu/docs/#introduction">Art Institute of Chicago's API</a>. The app also makes use of a few libraries: <a href="https://getbootstrap.com/docs/3.4/getting-started/">Bootstrap</a> for some minimal styling, <a href="https://axios-http.com/docs/intro">Axios</a> for requests, and <a href="https://github.com/Vibrant-Colors/node-vibrant">Vibrant</a> to extract the hex color codes for the prominent colors in the images of the artworks. 

### How do I browse through the artworks?
To browse through the available artworks, you can click the "previous" and "next" buttons at the bottom part of the homepage.

### How do I search for a specific work or artist? 
On the homepage, you may enter any search term into the textbox and click "search". 

### What if I cannot find the work I am looking for? 
Although you might not find a particular artist or work, the Art Institute of Chicago's collection continues to grow. Check out their website for more information on the works you might find in their collection. 

### How do I save artworks to my favorites? 
To save to favorites, you must first register for an account, then login. Browse through artworks on the homepage or search for a title or an srtist, then click on the <3 button to save the work to your favorites. You may view your favorites by clicking on the "Favorites" link in the header. 

