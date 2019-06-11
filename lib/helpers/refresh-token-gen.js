'use strict';

const phin = require('phin');

/**
 * Helper function can be used to generate a refresh token from provided data. The provided token params must be
 * an object with the following form:
```
{
  code: '<Previously generated grant token>',
  clientId: '<Assigned client Id>',
  clientSecret: '<Assigned client secret>',
  redirectUri: '<Redirect URI provided when creating client>',
}
```
 *
 * See the README for more information on generating grant and refresh tokens
 *
 * @param {object} tokenParams Parameters used to generate the refresh token
 */
module.exports = async (tokenParams) => {
  // Add the correct grant_type
  tokenParams.grant_type = 'authorization_code';

  // Generate the url parameters
  const {code, clientId, clientSecret, redirectUri} = tokenParams;
  const params = `?code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`;

  let res = await phin({
    url: 'https://accounts.zoho.com/oauth/v2/token' + params,
    method: 'POST'
  });

  try {
    res = JSON.parse(res.body.toString());
  } catch (e) {
    console.error(e);
    console.error(res.body.toString());
    throw new Error('Invalid Response Body JSON');
  }

  if (!res.refresh_token) {
    console.error(res);
    throw new Error(`Refresh Token Generation Error: ${res.error}`);
  }

  return res.refresh_token;
};
