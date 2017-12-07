var t = Handlebars.compile($('#template-row').html());
var $html = $(t());

function changeDate(){
  $html.find('.datePicker').datepicker({  
    minDate: minimumDate("2017-08-10"),
    maxDate: minimumDate("2017-08-15"),
  });
}


$html.find('.datePicker').datepicker({  
  dateFormat: "d MM yy",
  minDate: minimumDate("2017-06-04"),
  maxDate: minimumDate("2017-07-20"),
});
$('body').append($html);


function minimumDate(minDate) {
    var date = new Date(minDate);
    if (date < Date.now()) {
        return new Date(Date.now());
    } else {
        return date;
    }
}

function maximumDate(maxDate) {
    var date = new Date(maxDate);
    if (date < Date.now()) {
    } else {
        return date;
    }
}