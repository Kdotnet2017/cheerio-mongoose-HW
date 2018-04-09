var express = require("express");
var router = express.Router();
var db = require("../models");
var path = require("path");
var shortid = require("shortid");
//for scraping
var request = require("request");
var cheerio = require("cheerio");

router.get('/', function (req, res) {
    res.render("index");
});

router.get("/news", function (req, res) {
    db.Comment.find({}).then(function (data) {
        res.json(data);
    }).catch(function (err) {
        res.json(err);
    });
});
router.post("/save", function (req, res) {
    var comment = new db.Comment();
    comment.note = "This is just test!";
    db.Comment.create(comment).then(function (data) {
        res.json(data);
    });
});

router.post("/saveArticle", function (req, res) {
    var article = new db.Article();
    console.log(req.params);
    db.Article.create(article).then(function (data) {
        res.json(data);
    });
});

// here execute scraping when click btnScrap button
router.get("/scrape", function (req, res) {
    request("https://www.nytimes.com/section/business", function (err, response, html) {
        var $ = cheerio.load(html);
        var collectionResult = [];
        $(".story-link").each(function (i, element) {
            var result = {};
            result.id=shortid.generate();
            result.articleUrl = $(element).attr("href");
            result.headline = $(element).children("div.story-meta").children("h2").text().trim();
            result.summary = $(element).children("div.story-meta").children("p.summary").text().trim();
            result.byline = $(element).children("div.story-meta").children("p.byline").text().trim();
            result.imageUrl = $(element).children("div.wide-thumb").children("img").attr("src");
            collectionResult.push(result);
        });
        res.json(collectionResult);
    });
});
module.exports = router;