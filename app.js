const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const serverPath = path.resolve(__dirname, 'init/server');
const {getNewsData} = require(serverPath);
app.set("init",path.join(__dirname,"init"));

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine('ejs', ejsMate);

// app.get("/",(req,res)=>{
//     res.send("server is running");
// })

app.get("/",async(req,res)=>{
    const newsData = getNewsData();
    if (newsData && newsData.articles) {
        res.render("newspapers/index", { articles: newsData.articles });
    } else {
        console.log('No articles found or data not yet fetched.');
        res.render("newspapers/index",{articles :[]});
    }
});

app.listen(8080,()=> {
    console.log("listening to port");
});