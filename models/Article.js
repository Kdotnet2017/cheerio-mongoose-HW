var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//creating our Article model
var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    summary: {
        type: String,
        default: "Summary is not available!"
    },
    imageUrl: {
        type: String,
        default: "http://www.site.com/NoImage.jpg"
    },
    articleUrl: {
        type: String,
        default: "https://www.nytimes.com"
    },
    byline: {
        type: String,
        default: "N/A"
    },
    userComment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});
var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;