import * as http from 'http';

// Numero di film casuali da estrarre dall'API
const numero = 10;

// Funzione per estrarre un array di elementi unici da un array dato
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

// Funzione per ottenere un array di film casuali dall'API di themoviedb
export const getRandomMovies = async (req, res) => {
  const options = {
    hostname: 'api.themoviedb.org',
    path: '/3/movie/popular?api_key=94dac72dbc411b43b664a6cf6202f2a2',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let data = '';

  const request = http.request(options, (response) => {
    // Imposta la codifica in utf8 per evitare di ricevere dati binari
    response.setEncoding('utf8');

    // Aggiunge ogni chunk di dati ricevuto alla variabile "data"
    response.on('data', (chunk) => {
      data += chunk;
    });

    // L'intera risposta è stata ricevuta, elabora il risultato
    response.on('end', () => {
      var selection = getElementsFromArray(((JSON.parse(data)).results), numero);
      res.send(selection);
    });
  });

  // Stampa gli errori se ce ne sono
  request.on('error', (error) => {
    console.error(error);
    res.sendStatus(error);
  });

  // Conclude la richiesta
  request.end();
};

// Funzione per ottenere i dettagli di un film specifico dall'API di themoviedb
export const getMovie = async (req, res) => {
  const options = {
    hostname: 'api.themoviedb.org',
    path: '/3/movie/'+req.params.id+'?api_key=94dac72dbc411b43b664a6cf6202f2a2',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let data = '';

  const request = http.request(options, (response) => {
    // Imposta la codifica in utf8 per evitare di ricevere dati binari
    response.setEncoding('utf8');

    // Aggiunge ogni chunk di dati ricevuto alla variabile "data"
    response.on('data', (chunk) => {
      data += chunk;
    });

    // L'intera risposta è stata ricevuta, elabora il risultato
    response.on('end', () => {
      res.send(data);
    });
  });

  // Stampa gli errori se ce ne sono
  request.on('error', (error) => {
    console.error(error);
    res.sendStatus(error);
  });

  // Conclude la richiesta
  request.end();
};









