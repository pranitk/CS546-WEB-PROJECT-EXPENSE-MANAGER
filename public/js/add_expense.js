import MaterialDateTimePicker from 'material-datetime-picker';

(function(){

    console.log("Add expense front end javascript called") 

    const picker = new MaterialDateTimePicker()
    .on('submit', (val) => console.log(`data: ${val}`))
    .on('open', () => console.log('opened'))
    .on('close', () => console.log('closed'));

    document.querySelector('.c-datepicker-btn')
    .on('click', () => picker.open());  

    // const picker = new MaterialDateTimePicker()
    //     .on('submit', (val) => console.log(`data: ${val}`))
    //     .on('open', () => console.log('opened'))
    //     .on('close', () => console.log('closed'));
    
    // document.querySelector('.c-datepicker-btn')
    //     .on('click', () => picker.open());

    // document.getElementById("select_date").addEventListener('click',event =>{
    //     picker.open();
    // })
})();