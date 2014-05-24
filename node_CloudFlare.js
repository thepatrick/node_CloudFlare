var ranges = require('./ranges.json');

exports.check = function(req)
{
    var ip_address = (req.connection.remoteAddress ? req.connection.remoteAddress : req.remoteAddress);
    if (typeof req.headers['cf-connecting-ip'] === 'undefined')
    {
        return false;
    }
    else
    {
        var range_check = require('range_check');
        if (range_check.vaild_ip(ip_address))
        {
            var ip_ver = range_check.ver(ip_address);
            if (ip_ver === 4)
            {
                return range_check.in_range(ip_address, ranges.v4);
            }
            else if (ip_ver === 6)
            {
                return range_check.in_range(ip_address, ranges.v6);
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
}

exports.get = function(req)
{
    var ip_address = (req.connection.remoteAddress ? req.connection.remoteAddress : req.remoteAddress);
    if (typeof req.headers['cf-connecting-ip'] === 'undefined')
    {
        return ip_address;
    }
    else
    {
        return req.headers['cf-connecting-ip'];
    }
}
