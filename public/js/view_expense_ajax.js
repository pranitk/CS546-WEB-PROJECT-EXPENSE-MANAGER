
(function($){

    let list_item = $("#expense-item")

    list_item.onClick(function(event){
        event.preventDefault()

        var requestConfig = {
            method: "GET",
            url:"expenses/viewExpense/id"
        }

        //$.ajax(requestConfig)
    })
})