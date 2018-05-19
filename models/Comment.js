var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//creating our Comment model
var CommentSchema = new Schema({
    note: {
        type: String,
        required: true,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
});
var Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;