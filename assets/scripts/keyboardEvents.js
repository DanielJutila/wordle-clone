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

//Checks to see if you pressed enter
$(document).on("keydown", function (event) {
  if (event.which === 13) {
    //checks to make sure length is 5
    if (guessedLetter.length === 5) {
      validateWordAndEnter();
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
  console.log(wotd);
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
function enterElement() {
  i = 0;
  $('.row-' + [attempt] + ' > div').each(function (index, element) {
    let checked = check($(element).text());
    if (checked === 0) {
      $(this).css('background-color', 'green');
      greenOutKeyBoard($(element).text())

    }
    else if (checked === 1) {
      $(this).css('background-color', 'yellow');
      yellowOutKeyBoard($(element).text())
    }
    else {
      $(this).css('background-color', 'red');
      greyOutKeyboard($(element).text());
    }
    i++;
  });
  while (guessedLetter.length > 0) {
    guessedLetter.pop();
  }
  attempt++;
}
function check(letter) {
  //your code to be executed after 1 second
  if (letter === wotd[i]) {
    return 0;
  } else if (wotd.includes(letter)) {
    return 1;
  }
}

async function validateWordAndEnter() {
  const word = guessedLetter.join('');
  try {
    const isWordValid = await validateWordAPI(word);
    if (isWordValid) {
      enterElement();
    } else {
      console.log('Word not valid');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

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