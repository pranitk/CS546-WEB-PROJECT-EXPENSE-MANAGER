$(function(){


    $('#delete-expense').on("click",function(event){

        event.preventDefault()

        var requestConfig = {
            method: "DELETE",
            url:"/expenses/delete/"+id

        }
    })


})