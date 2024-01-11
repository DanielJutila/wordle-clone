function getApi() {
  var requestUrl = 'https://random-word-api.vercel.app/api?words=1&length=5';

  return fetch(requestUrl)
    .then(function (response) {
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function (data) {
      return data[0];
    });
}