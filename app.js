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

app.get("/",async(req,res)=>{
    const newsData = getNewsData();
    if (newsData && newsData.data) {
        res.render("newspapers/index", { data: newsData.data });
    } else {
        res.render("newspapers/index",{data :[]});
    }
});

app.get("/:source",async(req,res)=>{
    const {source} = req.params;
    const newsData = getNewsData();
    if (newsData && newsData.data) {
        const filteredNews = newsData.data.filter(news => {
            return news.source.trim().toLowerCase() === source.trim().toLowerCase();
        });
        if (filteredNews.length>0) {
            res.render("newspapers/show", { data: filteredNews, name: source });
        } else {
            res.status(404).render("newspapers/error",{message: "No Data Found"});
        }
    }
})

app.listen(8080,()=> {
    console.log("listening to port");
});