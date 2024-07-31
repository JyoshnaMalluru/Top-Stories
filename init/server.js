const apiKey = "d23d2653e592412bb9f1866b7e61e222";
const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
let newsData = null;

fetch(url)
    .then(response => response.json())
    .then(data =>{
        newsData = data;
        //console.log(newsData);
        console.log("data successfully giving output");
    })
    .catch(error => {
        console.error('Error fetching news:', error);
    });
    //console.log(`API Key: ${apiKey}`);
    
    module.exports = { getNewsData: () => newsData };

