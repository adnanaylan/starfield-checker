const axios = require('axios');
const player = require('play-sound')(opts = {});

const urls = [
  {
    url: 'https://www.amazon.de/-/en/dp/B0C7PKGRJS',
    availabilityText: 'Currently unavailable'
  },
  {
    url: 'https://international.gear.bethesda.net/products/starfield-constellation-edition',
    availabilityText: 'OUT OF STOCK'
  }
];

const musicFile = './alarm.mp3';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://www.google.com/'
};

function scrapeAndCheckAvailability(urlData) {
    axios.get(urlData.url, { headers })
      .then(response => {
        const html = response.data;
  
        const timestamp = new Date().toLocaleString();
        if (html.includes(urlData.availabilityText)) {
          console.log(`${timestamp}: false (${urlData.url})`);
        } else {
          console.log(`${timestamp}: true (${urlData.url})`);
          playLoudMusic();
        }
      })
      .catch(error => {
        console.log(`An error occurred while scraping ${urlData.url}:`, error);
      });
}
  
function playLoudMusic() {
  player.play(musicFile, (error) => {
    if (error) {
      console.log('Error playing music:', error);
    } else {
      console.log('Loud music played.');
    }
  });
}

// Initial execution for each URL
urls.forEach(urlData => scrapeAndCheckAvailability(urlData));

// Repeat every 1 minute
setInterval(() => {
  urls.forEach(urlData => scrapeAndCheckAvailability(urlData));
}, 60000);
