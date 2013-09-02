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
  var tokens = (cfg || {}).tokens || {};
  var params = extend({}, (cfg || {}).params, { grant_type: 'refresh_token'});
  var browserProcess;
  var oauth = new OAuth.OAuth2(
    client.key,
    client.secret,
    api.base,
    api.authPath,
    api.tokenPath
  );

  function checkAccessToken(req, res) {
    console.log(arguments);
  }

  // check that we have a refresh token
  if (! tokens.refresh) {
    return callback(new Error('no refresh token available for refresh request'));
  }

  oauth.getOAuthAccessToken(
    cfg.tokens.refresh,
    params,
    function(err, accessToken, refreshToken, results) {
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
};