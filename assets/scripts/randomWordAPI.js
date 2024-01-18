//api for checking letter
async function getApi() {
  const requestUrl = 'https://random-word-api.vercel.app/api?words=1&length=5';
  
  const response = await fetch(requestUrl);
  // Check if the request was successful (status code 200)
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data[0];
}
// 'https://api.dictionaryapi.dev/api/v2/entries/en/' 

