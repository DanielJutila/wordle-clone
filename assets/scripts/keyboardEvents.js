let attempt = 0;
let guessedLetter = [];

//gets the word of the day
getWotd();
let wotd = []
function getWotd() {
  getApi().then(function (result) {
    wotd = result.toUpperCase().split('');
  })
}

//Checks to see if you pressed enter
$(document).on("keydown", function (event) {
  if (event.which === 13) {
    //checks to make sure length is 5
    if (guessedLetter.length === 5) {
      enterElement();
      //clears array if both requirments pass
      while (guessedLetter.length > 0) {
        guessedLetter.pop();
      }
      attempt++;
    }
  }
});


$(document).on('keydown', function (event) {
  event.preventDefault();
  let key = String.fromCharCode(event.which);
  //removes letter from array
  if (event.which === 8) {
    guessedLetter.pop();
  }
  //checks to make sure it is letter being pressed
  //adds letter to array
  if (!/[^a-zA-Z]/.test(key)) {
    if (guessedLetter.length < 5) {
      guessedLetter.push(key);
      console.log(wotd);
      console.log(guessedLetter);
    }
  }
  showLetter();
});

//shows letters on screen
function showLetter() {
  $('.row-' + [attempt] + ' > div').each(function (index, element) {
    if (index < guessedLetter.length) {
      $(element).text(guessedLetter[index]);
    } else {
      $(element).text('');
    }
  });
}
function enterElement() {
  let i = 0;
  let guessed = [];
  $('.row-' + [attempt] + ' > div').each(function (index, element) {
    guessed.push($(element).text())
  });
  for(let g of guessed){
    if(g === wotd[i]){
      console.log('correct');
    } else {
      console.log('wrong')
    }
    i++;
  }
}

