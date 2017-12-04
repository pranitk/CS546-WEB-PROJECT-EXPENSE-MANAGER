$(function(){
    $("#add-category").on("submit",function(event){
        event.preventDefault();

        var newCategory = $("#new-category")

            
            $.ajax({
                url:"/expenses/addNewCategory",
                method : "POST",
                contentType:"application/json",
                data : JSON.stringify({category:newCategory.val()}),
                success:function(){
                   console.log("Successfull");
                }
            })

            

        
    })

    
})