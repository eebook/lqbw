var request = require('request');

var options = {
  url: 'http://localhost:8083/v1/about',
  headers: {
    'User-Agent': 'request111',
    'Content-Type': 'application/json'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info + " Stars");
    // console.log(info.forks_count + " Forks");
  }
}

request(options, callback);