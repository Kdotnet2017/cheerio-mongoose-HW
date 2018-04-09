
    $("#btnScrap").on("click",function(event){
        event.preventDefault();
        displayNews();
    });


function displayNews(){
    $("#results").empty();
   

    $.getJSON("/scrape",function(data){
        console.log(data);
        if(localStorage.getItem("scrapeObj")===null){
            localStorage.setItem("scrapeObj",JSON.stringify(data));
        }
        for(var i=0;i<data.length;i++){
            i;
           $("#results").prepend("<p >"+data[i].headline+"<button id='"+data[i].id+"' class='btnSave'>Save</button> </p>");
        }
    });
}

$(document).on("click",".btnSave",function(){
    var collectionResult=[];
    if(localStorage.getItem("scrapeObj")!==null){
        collectionResult=localStorage.getItem("scrapeObj");
    }
    else{
        return false;
    }
    var id=$(this).attr("id");
    
    console.log(id);
    console.log(collectionResult.length);
    function search(id,collectionResult){
        for(var i=0;i<collectionResult.length;i++){
            
            if(collectionResult[i].id===id){
                console.log(collectionResult[i]);
                return collectionResult[i];
            }
        }
    }
    var objData=search(id,collectionResult);
   
    $.ajax({
        type:"POST",
        dataType:"json",
        url:"/saveArticle",
        data: objData
    }).then(function(data){
        console.log(data);
    })

    console.log(id);
})