import * as http from 'http'

const options = {
  hostname: 'api.themoviedb.org',
  path: '/3/movie/popular?api_key=94dac72dbc411b43b664a6cf6202f2a2',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

var numero = 10;

function getElementsFromArray(arr, numero) {
  var result = [];
  while (result.length < numero) {
    var rand = arr[Math.round(Math.random() * arr.length)];
    if (!result.some(an => an === rand)) {
      result.push(rand);
    }
  }
  return result;
}

export const getRandomMovies = async (req, res) => {

  let data = '';

  const request = http.request(options, (response) => {
    // Set the encoding, so we don't get log to the console a bunch of gibberish binary data
    response.setEncoding('utf8');

    // As data starts streaming in, add each chunk to "data"
    response.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    response.on('end', () => {
      console.log((JSON.parse(data)).results);
      var selection = getElementsFromArray(((JSON.parse(data)).results), numero);
      res.send(selection);
    });
  });

  // Log errors if any occur
  request.on('error', (error) => {
    console.error(error);
    res.sendStatus(error);
  });
  // End the request
  request.end();

}









