let word = $('.letter-box');
let attempt = 0;
let guessedLetter = [];

$(document).on("keydown", function (event) {
  if (event.which === 13) {
    let row = $('.row-' + attempt);
    //checks to make sure length is 5
    if(guessedLetter.length === 5){
      //clears array if both requirments pass
    while(guessedLetter.length > 0){
      guessedLetter.pop();
    }
  }
  }
});


$(document).on('keydown', function (event) {
  event.preventDefault();
  let key = String.fromCharCode(event.which);

  //removes letter from array
  if(event.which === 8){
    guessedLetter.pop();
    console.log(guessedLetter);

    return;
  }
  //checks to make sure it is letter being pressed
  //adds letter to array
  if (!/[^a-zA-Z]/.test(key)) {
    if(guessedLetter.length < 5){
    guessedLetter.push(key);
    console.log(guessedLetter);

    }
  }
});

