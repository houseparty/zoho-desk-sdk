'use strict';

const ONE_MINUTE = 1000 * 60;

/**
 * Defines custom authentication token structure
 */
class AuthToken {
  /**
   * Generates an auth token from provided data directly from Zoho. If `null` is provided, will generate an empty token
   *
   * @param {object} token Auth token data taken directly from Zoho
   */
  constructor(token) {
    if (token === null) {
      // If `null` was explicitly passed into the constructor generate a blank token that expired a minute ago, this
      // will trigger a new token generation request on the next API call
      this.token = '';
      this.expiresAt = Date.now() - ONE_MINUTE;
      return;
    }

    this.token = token.access_token;

    // Tokens typically expire after 1 hour (3600000 milliseconds). However, it is possible that a request sent a few
    // ms before token expiration will expire in-flight, causing errors. For this reason, we expire the token a minute
    // early
    this.expiresAt = Date.now() + token.expires_in - ONE_MINUTE;
  }
}

module.exports = AuthToken;
