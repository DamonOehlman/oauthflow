/* jshint node: true */
'use strict';

var async = require('async');
var http = require('http');
var url = require('url');
var extend = require('cog/extend');
var launcher = require('browser-launcher');
var OAuth = require('oauth');
var out = require('out');

/**
  ## OAuth Version specific authenticators

**/

/**
  ### oauth2

**/
exports.oauth2 = function(cfg, callback) {
  var client = (cfg || {}).client || {};
  var api = (cfg || {}).api || {};
  var params = extend({}, (cfg || {}).params);
  var tmpServer = http.createServer(requestAccessToken);
  var browserProcess;
  var oauth = new OAuth.OAuth2(
    client.key,
    client.secret,
    api.base,
    api.authPath,
    api.tokenPath
  );

  function requestAccessToken(req, res) {
    var parts = url.parse(req.url, true);
    var params = {
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000/'
    };

    oauth.getOAuthAccessToken(
      parts.query.code,
      params,
      function(err, accessToken, refreshToken, results) {
        // kill the child browser process
        browserProcess.kill();

        // close the temporary server
        tmpServer.close();

        if (err) {
          return callback(err);
        }

        // otherwise update the access token and the refresh token in
        // the cfg and update
        cfg.tokens = cfg.tokens || {};
        cfg.tokens.access = accessToken;
        cfg.tokens.refresh = refreshToken;

        // trigger the callback
        callback(null, cfg);
      }
    );
  }

  async.waterfall([
    tmpServer.listen.bind(tmpServer, 3000),

    function(cb) {
      cb(null, oauth.getAuthorizeUrl(params))
    },

    authenticate
  ], function(err, ps) {
    if (err) {
      return callback(err);
    }

    // save the browser ps
    browserProcess = ps;
    out('started browser process, waiting for callback');
  });
};

/* internals */

function authenticate(url, callback) {
  launcher(function(err, launch) {
    var opts;

    if (err) {
      return callback(err);
    }

    opts = {
      browser: launch.browsers.local[0].name
    };

    launch(url, opts, callback);
  });
}