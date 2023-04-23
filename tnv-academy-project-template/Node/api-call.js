import * as http from 'http'

const options = {
  hostname: 'api.themoviedb.org',
  path: '/3/movie/popular?api_key=94dac72dbc411b43b664a6cf6202f2a2',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};
 var robi = [];
robi[0] = "coso";
robi[1] = "coso1";
robi[2] = "coso2";
robi[3] = "coso3";
robi[4] = "coso4";
robi[5] = "coso5";
robi[6] = "coso6";
robi[7] = "coso7";
robi[8] = "coso8";
robi[9] = "coso9";
 var numero = 6;
 
function getRobiRandom(robi,numero ){
 var  menoRobi = new Array();
  for(let i = 0; i < numero; i++){
    var randomIndex = Math.round(Math.random() * robi.length);
    console.log(randomIndex);
    console.log(menoRobi)
    while (menoRobi.length < numero){
      if (robi[randomIndex] != menoRobi[i]){
        menoRobi[i] = robi[randomIndex];
      } else{
        randomIndex = Math.round(Math.random() * robi.length);
      }
    }
  }
  return menoRobi;
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
      console.log(data);
      res.send(data);
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
console.log(getRobiRandom(robi,numero));








