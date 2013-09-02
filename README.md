# oauthflow

This is simple cli utility that is designed to make running an OAuth (
currently only OAuth2) flow simpler from the command-line.


[![NPM](https://nodei.co/npm/oauthflow.png)](https://nodei.co/npm/oauthflow/)


## Usage

Given that you have a configuration file something like the following:

```json
{
 "type": "oauth2",
 "api": {
  "base": "https://api.alfresco.com/auth/oauth/versions/2",
  "authPath": "/authorize",
  "tokenPath": "/token"
 },
 "client": {
  "key": "xxx",
  "secret": "xxx"
 },
 "callback": "http://localhost:3000/",
 "params": {
  "scope": "public_api",
  "response_type": "code"
 },
 "tokens": {
  "access": "c1150fbf-0f64-457a-ac80-dbec5f44eb87",
  "refresh": "ced8dd6e-0faf-4a10-a6a1-4c38180fe073"
 }
}

```

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

## OAuth Version specific authenticators

### oauth2

## OAuth Version specific authenticators

### oauth2

## License(s)

### MIT

Copyright (c) 2013 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
