
$("#btnSaved").on("click",function(event){
    event.preventDefault();
    $.getJSON("/api/articles",function(data){
        $("#results").empty();
        $("#btnScrap").remove();
        for(var i=0; i<data.length;i++){
            $("#results").prepend("<p id='"+data[i]._id+"'>"+data[i].headline+"<button id='"+data[i]._id+"' class='btnAddNote btn btn-info btn-lg'  data-toggle='modal' data-target='addNoteModal' >Article Notes</button><button id='"+data[i]._id+"' class='btnDelete'>Delete from Saved</button> </p>");
        }
       console.log(data);
    });
});
$(document).on("click",".btnAddNote",function(){
    var id=$(this).attr("id");
    $("#articleId").text("Notes for article: "+id);
    $('#addNoteModal').modal('show');
});

$(document).on("click",".btnDelete",function(){
    $('#addNoteModal').modal({ show: false });
    var id=$(this).attr("id");
    console.log(id);
    $.ajax({
        method:"POST",
        url:"/api/DeleteArticle/"+id
    }).then(function(data){

        console.log(data);
       // $("#id p").remove();
       
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
            $("#results").prepend("<p >" + data[i].headline + "<button  id='" + data[i].headline + "' class='btnSave'>Save</button> </p>");
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
        // if there is duplicate there is an error message
    })
})

