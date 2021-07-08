const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArrey = [];

// Unsplash API
const count = 30;
const apiKey = 'vyutfS7gMqOL_8t52wckyT-6GKbyqYpVLnmIw3N2vW8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if  all image are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Create Element for links & photos

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArrey.length;
    // Run function for each object in photosArrey
    photosArrey.forEach((photo) => {
        // Creating <a> to link to uplash
        const item = document.createElement('a');
        item.setAttribute('herf', photo.links.html);
        item.setAttribute('target', '_blank');
        // Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside image imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos form unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArrey = await response.json();
        displayPhotos();

    } catch (error) {
        // Catch error
    }
}
// Function for infinite scrolling:

window.addEventListener('scroll', () => {
     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {

         ready = false;
         getPhotos();
        
     }
});


// 

// Onload
getPhotos();