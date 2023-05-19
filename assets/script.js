
// defining variables for functions
let day = document.querySelector('#currentDay');
let time = document.querySelector('#currentTime');
let hour = document.querySelector('#hour');
let now = dayjs();
let currentHour = now.format('H');
let saveBtn = $('.saveBtn');

// loaded function for updating columns on refresh
$(function () {
  colorCode();
  displayText();

  // function to call saved text from local
  function displayText() {
    let userNotes = JSON.parse(localStorage.getItem('plannerNotes')) || {}
    let textKeys = Object.keys(userNotes)
    for (let i = 0; i < textKeys.length; i++) {
      $(`#text-${textKeys[i]}`).val(userNotes[textKeys[i]])
    }
  }

  // event listener to store the text 
  $(saveBtn).click(function(){
    let id = $(this).parent().attr("id")
    console.log($(this).siblings('.description'))
    console.log(id)
    let rowID = $(this).parent().attr('id')
    let rowText = $(this).siblings('.description').val()
    
    //userNotes['rowText'] = rowText
    let userNotes = JSON.parse(localStorage.getItem('plannerNotes')) || {};
    userNotes = {...userNotes, [rowID]: rowText};
    localStorage.setItem('plannerNotes', JSON.stringify(userNotes));
  })

  // colorCode function represent past, present, and future
  function colorCode() {
    const $timeBlocks = $('.time-block');
    const now = dayjs();
    const currentHour = now.format('H');
    
    $timeBlocks.each(function() {
      const $this = $(this);
      const id = this.id;
      
      $this.removeClass('past present future');
      
      if (id === currentHour) {
        $this.addClass('present');
      } else if (id < currentHour || currentHour > 17 || currentHour < 9) {
        $this.addClass('past');
      } else {
        $this.addClass('future');
      }
    });
  }

  // setInterval function to display date and time in the header
  setInterval(function () {
    day.textContent = dayjs().format('MMMM/DD/YYYY');
    time.textContent = dayjs().format('hh:mm:ss a');
  }, 1000);
});