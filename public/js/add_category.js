$(function(){
        document.getElementById("error-msg").style.visibility = "hidden";
        document.getElementById("success-msg").style.visibility = "hidden";
        $("#add-category").on("submit",function(event){
            
            event.preventDefault();
    
            var newCategory = $("#new-category")
    
                if(newCategory.val() == "" || newCategory.val() == undefined)
                {
                    document.getElementById("error-msg").style.visibility = "visible";
                    document.getElementById("success-msg").style.visibility = "hidden";
                    document.getElementById("error-msg").textContent = "Please enter the category name"
                    
                    $(container).append('<p>Please Enter Category Name</p>');

                }
                else
                {
                    $.ajax({
                        url:"/expenses/addNewCategory",
                        method : "POST",
                        contentType:"application/json",
                        data : JSON.stringify({category:newCategory.val()}),
                        success:function(response){
                                           
                        }
                    })
                    document.getElementById("success-msg").style.visibility = "visible";
                    document.getElementById("error-msg").style.visibility = "hidden";
                    document.getElementById("success-msg").textContent = "New category inserted"
                    //$(container).append('<p>Please Enter Category Name</p>');
                }
                
    
                
    
            
        })
    
        
})