function getApi(){
    var requestUrl = 'https://random-word-api.vercel.app/api?words=1&length=5';
    
  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    return data;
});

}
