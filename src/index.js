import server from './server';

const https = require('https');

const callback = (err, ip) => {
  if (err) {
    return console.log(err);
  }
  console.log('Our public IP is', ip);
  return ip;
};

https.get(
  {
    host: 'api.ipify.org',
  },
  response => {
    let ip = '';
    response.on('data', d => {
      ip += d;
    });
    response.on('end', () => {
      if (ip) {
        callback(null, ip);
      } else {
        callback('could not get public ip address :(');
      }
    });
  },
);
server.start();
