let attempt = 0;
let guessedLetter = [];

//gets the word of the day
getWotd();
let wotd = []
function getWotd() {
  getApi().then(function (result) {
    if(/[^a-zA-Z]/.test(result)){
      location.reload();
    }
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
let guessed = [];
let i = 0;
function enterElement() {
  while (guessed.length > 0) {
    guessed.pop();
  }
  i = 0;
  $('.row-' + [attempt] + ' > div').each(function (index, element) {
    let checked = check($(element).text());
    if (checked === 0) {
      $(this).css('background-color', 'green');
    } else if (checked === 1) {
      $(this).css('background-color', 'yellow');
    } else {
      $(this).css('background-color', 'red');

    }
    i++;
  });
}
function check(letter) {
  //your code to be executed after 1 second
  greyOutKeyboard(letter);
  if (letter === wotd[i]) {
    return 0;
  } else
    if (wotd.includes(letter)) {
      return 1;
    }
}

