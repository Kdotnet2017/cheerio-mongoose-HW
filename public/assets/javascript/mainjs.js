$("#btnSaved").on("click", function (event) {
    event.preventDefault();
    $.getJSON("/api/articles", function (data) {
        $("#results").empty();
        $("#btnScrap").remove();
        for (var i = 0; i < data.length; i++) {
            $("#results").prepend("<p id='" + data[i]._id + "'>" + data[i].headline + "<button id='" + data[i]._id + "' class='btnAddNote btn btn-info btn-lg'  data-toggle='modal' data-target='addNoteModal' >Article Notes</button><button id='" + data[i]._id + "' class='btnDelete'>Delete from Saved</button> </p>");
        }
    });
});
$(document).on("click", ".btnAddNote", function () {
    var id = $(this).attr("id");
    $("#articleId").text("Notes for article: " + id);
    $('#addNoteModal').modal('show');
    $.getJSON("/api/comments/" + id, function (data) {
        console.log("I am here");
        console.log(data);
        $("#notesDiv").empty();
        $("#txtNote").val("");
        for (var i = 0; i < data[0].userComment.length; i++) {
            $("#notesDiv").prepend("<p  data-id='" + data[0].userComment[i]._id + "'>" + data[0].userComment[i].note + "<button data-id='" + data[0].userComment[i]._id + "'  class='btnNotesDiv'>delete</button> ");
        }
    })

    $("#btnAddComment").on("click", function (event) {
        $.ajax({
            method: "POST",
            url: "/api/saveComment/" + id,
            data: {
                note: $("#txtNote").val(),
            }
        }).then(function (data) {
            console.log(data);
        })
    })
});
$(document).on("click", ".btnNotesDiv", function (event) {
    event.preventDefault();
    var id = $(this).attr("data-id");
    var articleId = $("#articleId").text();
    articleId = articleId.replace("Notes for article: ", "");
    console.log(articleId);
    console.log(id);
    $.ajax({
        method: "POST",
        url: "/api/DeleteComment/" + id + "/" + articleId
    }).then(function (data) {
        console.log("deleted..");
    })
})


$(document).on("click", ".btnDelete", function () {
    $('#addNoteModal').modal({ show: false });
    var id = $(this).attr("id");
    console.log(id);
    $.ajax({
        method: "POST",
        url: "/api/DeleteArticle/" + id
    }).then(function (data) {

        console.log(data);
    })
});


$("#btnScrap").on("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    displayNews();
});
function displayNews() {
    $("#results").empty();
    $.getJSON("/api/scrape", function (data) {
        if (localStorage.getItem("scrapeObj") === null) {
            localStorage.setItem("scrapeObj", JSON.stringify(data));
        }
        for (var i = 0; i < data.length; i++) {
            $("#results").prepend("<p class='lead' ><img  class='img-thumbnail' src='" + data[i].imageUrl + "'>" + data[i].headline + "<button  id='" + data[i].headline + "' class='btnSave btn-primary btn-lg'>Save</button> </p><hr>");
        }
    });
}
$(document).on("click", ".btnSave", function () {
    $('#addNoteModal').modal({ show: false });
    var collectionResult = [];
    if (localStorage.getItem("scrapeObj") !== null) {
        collectionResult = JSON.parse(localStorage.getItem("scrapeObj"));
    }
    else {
        return false;
    }
    $(this).toggleClass('clicked');
    var id = $(this).attr("id");
    function search(id, collectionResult) {
        for (var i = 0; i < collectionResult.length; i++) {
            var singleObj = collectionResult[i];
            if (singleObj.headline === id) {
                return collectionResult[i];
            }
        }
    }
    var objData = search(id, collectionResult);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/api/saveArticle",
        data: objData
    }).then(function (data) {
        console.log(data);
    })
})

