$(function(){


        $('#category > a').click(function(e){
            console.log("Selected category is "+this.textContent)
            const temp = this.textContent.trim()
            let strings = temp.split("  ")
            console.log("0 -> "+strings[0])
            console.log("1 -> "+strings[1])
            document.getElementById("btn-category").textContent = strings[1]
            document.getElementById("icon-category").textContent = strings[0]
            document.getElementById("selected_category").value = temp
        })

        $('#bank-dropdown > button').click(function(e){

            const bank_account = this.textContent.trim()
            console.log("Bank account is "+bank_account)
            console.log("Bank number is "+this.value)
            document.getElementById("btn-bank-account").textContent = bank_account
            document.getElementById("selected_bank_account").value = this.value.trim()

        })

        document.getElementById("error-msg").style.visibility = "hidden";
        document.getElementById("success-msg").style.visibility = "hidden";
        
        $("#add-category").on("submit",function(event){
            
            event.preventDefault();
    
            var newCategory = $("#new-category")
    
                /*if(newCategory.val())
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
                }*/

                if(newCategory.val())
                {
                    var requestConfig = {
                        method : "POST",
                        url : "/expenses/addNewCategory",
                        contentType : "application/json",
                        data : JSON.stringify({
                            category : newCategory.val()
                        })
                    }
                    
                }
                else
                {
                    document.getElementById("error-msg").style.visibility = "visible";
                    document.getElementById("success-msg").style.visibility = "hidden";
                    document.getElementById("error-msg").textContent = "Please enter the category name"
                   
                }
                
                $.ajax(requestConfig).then(function(responseMessage){

                        if(requestConfig != undefined)
                        {
                            document.getElementById("success-msg").style.visibility = "visible";
                            document.getElementById("error-msg").style.visibility = "hidden";
                            document.getElementById("success-msg").textContent = "New category inserted"
                            var createdCategory = "<a class = 'dropdown-item'> <span><i id='dropdown-category-icon' class='material-icons'>loyalty</i></span> "+responseMessage.message+"</a>"
                            // error_msgs = "<p>New Category Inserted</p>";
                            // $(error_msgs).css("color","green");
                            //$(error_msgs).insertBefore($("#add-category"));
                            $(createdCategory).insertBefore($("#divider"))
                        }
                        
                    
                    
                    
                    
                    
                    
                })
                
    
                
    
            
        })
    
        
})