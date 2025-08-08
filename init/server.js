require('dotenv').config();
const apiKey = process.env.API_KEY;
const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&countries=in`
let newsData = null;

fetch(url)
    .then(response => response.json())
    .then(data =>{
        newsData = data;
        console.log("data successfully giving output");
    })
    .catch(error => {
        console.error('Error fetching news:', error);
    });    
    module.exports = { getNewsData: () => newsData };

