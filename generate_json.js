//CloudFlare IP Ranges from https://www.cloudflare.com/ips

var https = require('https'),
    fs    = require('fs'),
    path  = require('path');

function getIPRange(kind, cb) {
  var ipURL = 'https://www.cloudflare.com/ips-v' + kind;
  https.get(ipURL, function(res) {
    var data = '';
    res.on('data', function(d) {
      data = data + d.toString();
    });
    res.on('end', function() {
      cb(null, data.split("\n").map(function(str) {
        return str.trim();
      })); 
    });
    res.on('error', function(err) {
      throw(Error('Unable to get ' + ipURL + ' because: ' + err.message || err));
    });
  });
}

getIPRange(4, function(err, v4) {
    if(err) throw err;
    getIPRange(6, function(err, v6) {
      if(err) throw err;
      var contents = JSON.stringify({ v4: v4, v6: v6 });
      fs.writeFileSync(path.resolve('ranges.json'), contents, 'utf8');
      console.log('Wrote config file');
    });
});
