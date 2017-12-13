// bind an event handler to the button
$('.slectValBtn').click(function(){
    // remove all errors 
    $('.slectVal').removeClass('hasErrors');
    $('.error').remove();
    // create a var to track any errors
     var errors = 0
     // loop through all your elements with the class `slectVal`
     $('.slectVal').each(function(){
        // get the minimum value fo this element
        var min = $(this).data('min-val');
        // get the custom message for this element
        var msg = '<br><span class="error">'+$(this).data('error-msg')+min+'</span>';
        // check the element's value
        if( $(this).val() < min ){
           // if i the value fails validation, add 1 to our errors count
           errors++;
          $(this).addClass('hasErrors');
          // add error message
          $(msg).insertAfter( $(this) );
        }
     
     }); 
     // after looping all elements, check our error count
     if(errors > 0){
       // had errors
       alert('All values must be greater than 0');
     }
     else{
       // no errors
       alert('All values valid!');
       
     }
 });