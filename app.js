// app.js (main entry file)
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const serverPath = path.resolve(__dirname, 'init/server');
const { getNewsData } = require(serverPath);

app.set("init", path.join(__dirname, "init"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", async (req, res) => {
  const newsData = getNewsData();
  if (newsData && newsData.data) {
    res.render("newspapers/index", { data: newsData.data });
  } else {
    res.render("newspapers/index", { data: [], error: "Unable to fetch news." });
  }
});

app.get("/bookmarks", (req, res) => {
  res.render("newspapers/bookmark");
});

app.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  const newsData = getNewsData();
  if (newsData && newsData.data) {
    const filteredNews = newsData.data.filter(news => {
      return news.category && news.category.toLowerCase() === category.toLowerCase();
    });
    if (filteredNews.length > 0) {
      res.render("newspapers/index", { data: filteredNews });
    } else {
      res.status(404).render("newspapers/error", { message: "No News Found for this Category." });
    }
  } else {
    res.status(500).render("newspapers/error", { message: "News API Error" });
  }
});

app.get("/:source", async (req, res) => {
  const { source } = req.params;
  const newsData = getNewsData();
  if (newsData && newsData.data) {
    const filteredNews = newsData.data.filter(news => {
      return news.source.trim().toLowerCase() === source.trim().toLowerCase();
    });
    if (filteredNews.length > 0) {
      res.render("newspapers/show", { data: filteredNews, name: source });
    } else {
      res.status(404).render("newspapers/error", { message: "No Data Found" });
    }
  } else {
    res.status(500).render("newspapers/error", { message: "News API Error" });
  }
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});