
(function($){

    let list_item = $("#expense-item")

    console.log("Ajax code");

    list_item.on("click",function(event){
        event.preventDefault()

        console.log("Ajax: list item clicked");

        var requestConfig = {
            method: "GET",
            url:"expenses/viewExpense/id"
        }

        $.ajax(requestConfig).then(function(expense){
            console.log("Got response")
        })
    })

})(window.jQuery)