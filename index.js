/* jshint node: true */
'use strict';

var authenticators = require('./authenticators');
var refreshers = require('./refreshers');

/**
  # oauthflow

  This is simple cli utility that is designed to make running an OAuth (
  currently only OAuth2) flow simpler from the command-line.

  ## Usage

  Given that you have a configuration file something like the following:

  <<< examples/config.json

  You should be able to run the following:

  ```
  oauthflow < test.json > test-updated.json && mv test-updated.json test.json
  ```

  If this is the first run (i.e. there is are no `tokens` stored within the
  config) then you will be passed through the full OAuth authentication flow
  (opening browser windows, etc, etc).  If, however, you already have some
  token information stored in the configuration info passed to `oauthflow`,
  e.g.:

  ```json
  {
   ...,
   "tokens": {
    "access": "c1150fbf-0f64-457a-ac80-dbec5f44eb87",
    "refresh": "ced8dd6e-0faf-4a10-a6a1-4c38180fe073"
   }
  }
  ```

  Then a simple refresh flow will be attempted instead.
  
**/

exports.authenticate = function(cfg, callback) {
  var oauthType = (cfg || {}).type || 'oauth2';
  var authFn = authenticators[oauthType.toLowerCase()];

  // if we have no initializer, abort
  if (typeof authFn != 'function') {
    return callback(new Error('Unable to find authenticator for oauth type: ' +
      oauthType));
  }

  authFn(cfg, callback);
};

exports.refresh = function(cfg, callback) {
  var oauthType = (cfg || {}).type || 'oauth2';
  var refreshFn = refreshers[oauthType.toLowerCase()];

  // if we have no initializer, abort
  if (typeof refreshFn != 'function') {
    return callback(new Error('Unable to find refresher for oauth type: ' +
      oauthType));
  }

  refreshFn(cfg, callback);
};