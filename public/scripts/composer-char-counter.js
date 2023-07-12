$(document).ready(function() {
  $("#tweet-text").on("input", function(event) {
    const maxLength = 140;
    const inputLength = $(this).val().length;
    $('.counter').text(maxLength - inputLength);
    if (inputLength > maxLength) {
      console.log(event);
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
    console.log((maxLength - inputLength) + "characters left");
  });
});