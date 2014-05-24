var range_check = require('range_check'),
    net = require('net'),
    ranges = require('../ranges.json');

exports.check = function(req) {
  var ip_address = (req.connection.remoteAddress ? req.connection.remoteAddress : req.remoteAddress);
  if (typeof req.headers['cf-connecting-ip'] === 'undefined') {
    return false;
  } else {
    if(net.isIPv4(ip_address)) {
      return range_check.in_range(ip_address, ranges.v4);
    } else if(net.isIPv6(ip_address)) {
      return range_check.in_range(ip_address, ranges.v6);
    } else {
      return false;
    }
  }
};

exports.get = function(req) {
  var ip_address = (req.connection.remoteAddress ? req.connection.remoteAddress : req.remoteAddress);
  if (typeof req.headers['cf-connecting-ip'] === 'undefined') {
    return ip_address;
  } else {
    return req.headers['cf-connecting-ip'];
  }
};
