var express = require("express");
var router = express.Router();
var db = require("../models");
var path = require("path");

var request = require("request");
var cheerio = require("cheerio");

router.get('/', function (req, res) {
    res.render("index");
});

router.get("/api/comments/:articleId", function (req, res) {
    db.Article.find({ _id: req.params.articleId }).populate("userComment").then(function (data) {
        console.log(data);
        res.json(data);
    }).catch(function (err) {
        res.json(err);
    });
});

router.post("/api/DeleteComment/:id/:aid", function (req, res) {
    db.Comment.remove({ _id: req.params.id }).then(function (data) {
        return db.Article.findOneAndUpdate({ _id: req.params.aid }, { $unset: { _id: req.params.id } });
    }).then(function (dataArticle) {
        res.json(data);
    }).catch(function (err) {
        res.json(err);
    });
});
router.get("/api/articles", function (req, res) {
    db.Article.find({}).then(function (data) {
        res.json(data);
    }).catch(function (err) {
        res.json(err);
    });
});
router.post("/api/saveComment/:id", function (req, res) {

    db.Comment.create(req.body).then(function (data) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { userComment: data._id } }, { new: true });
    }).then(function (dbArticle) {
        res.json(dbArticle);
    }).catch(function (err) {
        return res.json(err);
    });
});
router.post("/api/DeleteArticle/:id", function (req, res) {
    db.Article.remove({ _id: req.params.id }).then(function (data) {
    });
});
router.post("/api/saveArticle", function (req, res) {
    db.Article.create(req.body).then(function (data) {
        res.json(data);
    }).catch(function (err) {
        return res.json(err);
    });
});

router.get("/api/scrape", function (req, res) {
    request("https://www.nytimes.com/section/business", function (err, response, html) {
        var $ = cheerio.load(html);
        var collectionResult = [];
        $(".story-link").each(function (i, element) {
            var result = {};
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