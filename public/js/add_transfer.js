$(function(){


    $('#bank-dropdown-1 > button').click(function(e){
        
        const bank_account = this.textContent.trim()
        console.log("Bank account 1 is "+bank_account)
        console.log("Bank number 1 is "+this.value)
        document.getElementById("btn-bank-account1").textContent = bank_account
        document.getElementById("selected_bank_account1").value = this.value.trim()
        
    })


    $('#bank-dropdown-2 > button').click(function(e){
        
        const bank_account = this.textContent.trim()
        console.log("Bank account 2 is "+bank_account)
        console.log("Bank number 2 is "+this.value)
        document.getElementById("btn-bank-account2").textContent = bank_account
        document.getElementById("selected_bank_account2").value = this.value.trim()
        
    })


})