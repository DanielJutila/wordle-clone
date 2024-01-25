let attempt = 0;
let guessedLetter = [];
//gets the word of the day
getWotd();
let wotd = []
function getWotd() {
  getApi().then(function (result) {
    if (/[^a-zA-Z]/.test(result)) {
      location.reload();
    }
    wotd = result.toUpperCase().split('');
  })
}

$('.pa-button').on('click', function(){
  location.reload();
})

//Lets the user press the keys on the bottom of the screen to write
$('.keyboard-button').on('click', function () {
  var pressedKey = $(this).data('key');

  //checks if they clicked enter or del
  if (pressedKey.toLowerCase() === 'enter') {
    keyCode = 13;
  } else if (pressedKey.toLowerCase() === 'del') {
    keyCode = 8;
  } else {
    keyCode = pressedKey.charCodeAt(0);
  }
  var event = $.Event('keydown');
  event.keyCode = keyCode;
  $(document).trigger(event);
});

$(document).on('keydown', function (event) {

  if (event.keyCode === 13) {
    if (guessedLetter.length === 5) {
      validateWordAndEnter();
      console.log(wotd);
    }
  }
  //checks to see if only the letters were pressed
  //This was added so that function keys would still work.
  if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode === 8) {

    let key = String.fromCharCode(event.keyCode);
    //removes letter from array
    if (event.keyCode === 8) {
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
  }
});

//shows letters on screen
function showLetter() {
  $('.row-' + [attempt] + ' > div').each(function (index, element) {
    if (index < guessedLetter.length) {
      $(element).text(guessedLetter[index]);
    }
    else {
      $(element).text('');
    }
  });
}


let i = 0;
let correct = 0;
function processLetters() {
  i = 0
  function processNextLetter() {
    if (i < $('.row-' + attempt + ' > div').length) {
      let element = $('.row-' + attempt + ' > div').eq(i);
      let checked = check($(element).text());

      if (checked === 0) {
        $(element).css('background-color', greenColor);
        greenOutKeyBoard($(element).text());
      } else if (checked === 1) {
        $(element).css('background-color', yellowColor);
        yellowOutKeyBoard($(element).text());
      } else {
        $(element).css('background-color', grayColor);
        greyOutKeyboard($(element).text());
      }
      i++;
      setTimeout(processNextLetter, 250);
    } else {
      // Reset guessedLetter array and increment attempt
      while (guessedLetter.length > 0) {
        guessedLetter.pop();
      }
      attempt++;
      correct = 0;
    }

    if(correct === 5 || attempt === 6){
      checkWin();
    }
  }

  processNextLetter();

  function check(letter) {
    if (letter === wotd[i]) {
      correct++;
      return 0;
    } else if (wotd.includes(letter)) {
      return 1;
    }
  }
}

function checkWin(){
  if(correct === 5){
    $('.word-display').text('You won! nice');
    hideKeyboard();
  }
  if(correct < 5 && attempt === 6){
    $('.word-display').text("You lose. The word was '" + wotd.join('') + "'");
    hideKeyboard();
  }
  function hideKeyboard(){
    $('#keyboard-cont').css('display', 'none');
    $('.play-again').css('visibility', 'visible');
  }
}

async function validateWordAndEnter() {
  const word = guessedLetter.join('');
  try {
    const isWordValid = await validateWordAPI(word);
    if (isWordValid) {
      processLetters();
    } else {
      //this is added to shake the row if the word is invalid.
      $('.row-' + attempt).addClass('shake')
      setTimeout(function () {
        $('.row-' + attempt).removeClass('shake');
      }, 150);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

//checks if the word you entered is a valid word,
//Want to move this to the API page in the future
function validateWordAPI(word) {
  return fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
    .then(response => {
      if (response.ok) {
        return true; // Word found
      } else if (response.status === 404) {
        return false; // Word not found
      } else {
        throw new Error('Unexpected response status: ' + response.status);
      }
    })
    .catch(error => {
      console.error('API error:', error);
      throw error;
    });
}